# Hệ thống quản lý trạm xăng

Đây là file SQL dùng để tạo cơ sở dữ liệu "tramxang", bao gồm các bảng, dữ liệu mẫu và các stored procedure hỗ trợ quản lý giao dịch, trụ bơm, trạm xăng và thống kê doanh thu.

## I. Cấu trúc cơ sở dữ liệu

Hệ thống bao gồm các bảng sau:

Bảng hanghoa (Sản phẩm)

- mahanghoa: nvarchar(10), khóa chính
- tenhanghoa: nvarchar(100), tên sản phẩm
- dongia: decimal(18,2), giá bán, phải >= 0

Bảng tramxang (Trạm xăng)

- matramxang: nvarchar(10), khóa chính
- tentramxang: nvarchar(100), tên trạm xăng
- diachi: nvarchar(200), địa chỉ trạm xăng

Bảng trubom (Trụ bơm)

- matrubom: nvarchar(10), khóa chính
- matramxang: nvarchar(10), khóa ngoại tham chiếu tramxang(matramxang)
- mahanghoa: nvarchar(10), khóa ngoại tham chiếu hanghoa(mahanghoa)

Bảng giaodich (Giao dịch)

- magiaodich: nvarchar(10), khóa chính
- matrubom: nvarchar(10), khóa ngoại tham chiếu trubom(matrubom)
- soluong: decimal(10,2), số lượng xăng/dầu (lít), phải > 0
- thanhtien: decimal(18,2), tổng tiền, phải >= 0
- ngaygio: datetime, thời gian giao dịch, mặc định là thời điểm hiện tại (getdate())

## II. Dữ liệu mẫu

Hàng hóa:

- Xăng RON 95-IV: 25,000 VND/lít
- Xăng E5 RON 92-II: 23,000 VND/lít
- Dầu DO 0.05S: 21,000 VND/lít

Trạm xăng:

- TX01: Trạm xăng Bình Thạnh
- TX02: Trạm xăng Quận 1

Trụ bơm:

- TB01–TB03 thuộc TX01
- TB04–TB05 thuộc TX02

Giao dịch:

- 10 giao dịch mẫu từ 20/08/2025 đến 26/08/2025, bao gồm số lượng, tổng tiền và trụ bơm thực hiện giao dịch.

## III. Stored Procedure

1. sp_get_giaodich_tram: Lấy tất cả giao dịch của 1 trạm trong khoảng ngày

- Input - @matramxang: nvarchar(10), mã trạm xăng, ví dụ 'TX01' - @from_date: date, ngày bắt đầu, ví dụ '2025-08-22' - @to_date: date, ngày kết thúc, ví dụ '2025-08-24'
  Ví dụ:
  exec sp_get_giaodich_tram 'TX01', '2025-08-22', '2025-08-24';

2. sp_doanhthu_trubom_ngay: Tổng doanh thu theo ngày cho 1 trụ bơm

- Input - @matrubom: nvarchar(10), mã trụ bơm, ví dụ 'TB01' - @ngay: date, ngày cần tính doanh thu, ví dụ '2025-08-22'
  Ví dụ:
  exec sp_doanhthu_trubom_ngay 'TB01', '2025-08-22';

3. sp_doanhthu_tram_ngay: Tổng doanh thu theo ngày cho trạm xăng

- Input - @matramxang: nvarchar(10), mã trạm xăng, ví dụ 'TX01' - @ngay: date, ngày cần tính doanh thu, ví dụ '2025-08-20'
  Ví dụ:
  exec sp_doanhthu_tram_ngay 'TX01', '2025-08-20';

4. sp_top3_hanghoa_tram_thang: Top 3 hàng hóa bán chạy nhất và tổng số lít trong tháng

- Input - @matramxang: nvarchar(10), mã trạm xăng, ví dụ 'TX01' - @nam: int, năm cần thống kê, ví dụ 2025 - @thang: int, tháng cần thống kê, ví dụ 8
  Ví dụ:
  exec sp_top3_hanghoa_tram_thang 'TX01', 2025, 8;

## IV. Hướng dẫn thực thi

1. Clone repo về từ Github:
   git clone https://github.com/Cong-Chau/SHUB-Test
2. Điều hướng vào thư mục Task3:
   cd SHUB-Test/Task3
3. Mở file SQL_query.ssql bằng SQL Server Management Studio (SSMS).
   - File sẽ:
     - Tạo cơ sở dữ liệu tramxang
     - Tạo các bảng hanghoa, tramxang, trubom, giaodich
     - Chèn dữ liệu mẫu
     - Tạo các stored procedure hỗ trợ truy vấn
4. Kiểm tra dữ liệu:
   SELECT _ FROM hanghoa;
   SELECT _ FROM tramxang;
   SELECT _ FROM trubom;
   SELECT _ FROM giaodich;
5. Thực thi các stored procedure mẫu như trên.
