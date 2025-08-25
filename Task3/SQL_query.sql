create database tramxang;
go
use tramxang;
go

-- tạo bảng hanghoa (sản phẩm)
create table hanghoa (
    mahanghoa nvarchar(10) primary key,
    tenhanghoa nvarchar(100) not null,
    dongia decimal(18,2) not null check (dongia >= 0)
);

-- tạo bảng tramxang (trạm xăng)
create table tramxang (
    matramxang nvarchar(10) primary key,
    tentramxang nvarchar(100) not null,
    diachi nvarchar(200) not null
);

-- tạo bảng trubom (trụ bơm)
create table trubom (
    matrubom nvarchar(10) primary key,
    matramxang nvarchar(10) not null,
    mahanghoa nvarchar(10) not null,
    foreign key (matramxang) references tramxang(matramxang),
    foreign key (mahanghoa) references hanghoa(mahanghoa)
);

-- tạo bảng giaodich (giao dịch)
create table giaodich (
    magiaodich nvarchar(10) primary key,
    matrubom nvarchar(10) not null,
    soluong decimal(10,2) not null check (soluong > 0),
    thanhtien decimal(18,2) not null check (thanhtien >= 0),
    ngaygio datetime not null default getdate(),
    foreign key (matrubom) references trubom(matrubom)
);

-- Inset dữ liệu
-- Insert dữ liệu bảng hanghoa
insert into hanghoa(mahanghoa, tenhanghoa, dongia) values
('HH01', N'Xăng RON 95-IV', 25000),
('HH02', N'Xăng E5 RON 92-II', 23000),
('HH03', N'Dầu DO 0.05S', 21000);

-- Insert dữ liệu bảng tramxang
insert into tramxang(matramxang, tentramxang, diachi) values
('TX01', N'Trạm xăng Bình Thạnh', N'123 Điện Biên Phủ, Bình Thạnh, TP.HCM'),
('TX02', N'Trạm xăng Quận 1', N'45 Lê Lợi, Quận 1, TP.HCM');

-- Insert dữ liệu bảng trubom
insert into trubom(matrubom, matramxang, mahanghoa) values
('TB01', 'TX01', 'HH01'),
('TB02', 'TX01', 'HH02'),
('TB03', 'TX01', 'HH03'),
('TB04', 'TX02', 'HH01'),
('TB05', 'TX02', 'HH02');

-- Insert dữ liệu bảng giaodich
insert into giaodich(magiaodich, matrubom, soluong, thanhtien, ngaygio) values
('GD01', 'TB01', 10.5, 10.5 * 25000, '2025-08-20 08:30:00'),
('GD02', 'TB02', 5.0, 5.0 * 23000, '2025-08-20 09:00:00'),
('GD03', 'TB03', 20.0, 20.0 * 21000, '2025-08-21 09:15:00'),
('GD04', 'TB04', 7.2, 7.2 * 25000, '2025-08-21 10:00:00'),
('GD05', 'TB05', 12.0, 12.0 * 23000, '2025-08-22 10:30:00'),
('GD06', 'TB01', 8.0, 8.0 * 25000, '2025-08-22 07:45:00'),
('GD07', 'TB02', 15.0, 15.0 * 23000, '2025-08-23 09:10:00'),
('GD08', 'TB03', 12.5, 12.5 * 21000, '2025-08-24 14:20:00'),
('GD09', 'TB04', 6.0, 6.0 * 25000, '2025-08-25 15:00:00'),
('GD10', 'TB05', 9.8, 9.8 * 23000, '2025-08-26 10:40:00');

go
-- Kiểm tra tất cả bảng dữ liệu
   SELECT * FROM hanghoa;
   SELECT * FROM tramxang;
   SELECT * FROM trubom;
   SELECT * FROM giaodich;


go

-- 1. Lấy tất cả giao dịch của 1 trạm trong khoảng ngày
create procedure sp_get_giaodich_tram
    @matramxang nvarchar(10),
    @from_date date,
    @to_date date
as
begin
    -- chuẩn hóa thời gian
    declare @start datetime = dateadd(second, 1, cast(@from_date as datetime));
    declare @end   datetime = dateadd(second, -1, dateadd(day, 1, cast(@to_date as datetime)));

    select 
        gd.magiaodich,
        gd.matrubom,
        tx.matramxang,
        tx.tentramxang,
        gd.soluong,
        gd.thanhtien,
        gd.ngaygio,
        hh.tenhanghoa,
        hh.dongia
    from giaodich gd
    join trubom tb on gd.matrubom = tb.matrubom
    join tramxang tx on tb.matramxang = tx.matramxang
    join hanghoa hh on tb.mahanghoa = hh.mahanghoa
    where tx.matramxang = @matramxang
      and gd.ngaygio between @start and @end
    order by gd.ngaygio;
end;
go


exec sp_get_giaodich_tram 'TX01', '2025-08-22', '2025-08-24';

go
-- 2. Tổng doanh thu theo ngày cho 1 trụ bơm
create procedure sp_doanhthu_trubom_ngay
    @matrubom nvarchar(10),
    @ngay date
as
begin
    select 
        @matrubom as matrubom,
        @ngay as ngay,
        sum(thanhtien) as tong_doanhthu
    from giaodich
    where matrubom = @matrubom
      and cast(ngaygio as date) = @ngay
    group by matrubom;
end
go

exec sp_doanhthu_trubom_ngay 'TB01', '2025-08-22';

go
-- 3. Tổng doanh thu theo ngày cho trạm
create procedure sp_doanhthu_tram_ngay
    @matramxang nvarchar(10),
    @ngay date
as
begin
    select 
        @matramxang as matramxang,
        @ngay as ngay,
        sum(gd.thanhtien) as tong_doanhthu
    from giaodich gd
    join trubom tb on gd.matrubom = tb.matrubom
    where tb.matramxang = @matramxang
      and cast(gd.ngaygio as date) = @ngay
    group by tb.matramxang;
end
go

exec sp_doanhthu_tram_ngay 'TX01', '2025-08-20';

go
-- 4. Lấy top 3 hàng hóa bán chạy nhất và tổng số lít tại một trạm trong tháng
create procedure sp_top3_hanghoa_tram_thang
    @matramxang nvarchar(10),
    @nam int,
    @thang int
as
begin
    select top 3 
        hh.mahanghoa,
        hh.tenhanghoa,
        sum(gd.soluong) as tong_soluong
    from giaodich gd
    join trubom tb on gd.matrubom = tb.matrubom
    join hanghoa hh on tb.mahanghoa = hh.mahanghoa
    where tb.matramxang = @matramxang
      and year(gd.ngaygio) = @nam
      and month(gd.ngaygio) = @thang
    group by hh.mahanghoa, hh.tenhanghoa
    order by tong_soluong desc;
end
go

exec sp_top3_hanghoa_tram_thang 'TX01', 2025, 8;

