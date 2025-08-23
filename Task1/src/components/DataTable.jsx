import { ArrowLeft, ArrowRight } from "lucide-react";

import { useState } from "react";

function DataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 20;
  const totalPage = Math.ceil(data.length / rowsPerPage);

  // Lấy dữ liệu trang hiện tại
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  // Xử lý về trước
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Xử lý ra sau
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
  };

  // xử lý chọn trang cụ thể
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Hàm tạo danh sách số trang hiển thị
  const getPageNumbers = () => {
    const pages = [];

    if (totalPage <= 7) {
      // Nếu ít trang thì show hết
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      // Nếu nhiều trang thì hiển thị dạng rút gọn
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(
          1,
          "...",
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPage
        );
      }
    }
    return pages;
  };

  return (
    <div className="w-full mt-4 p-4 border border-gray-200 rounded-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        {/* Tiêu đề */}
        <div>
          <h1 className="font-semibold text-xl">Chi tiết giao dịch</h1>
          <p className="text-sm text-gray-500">
            Danh sách chi tiết các giao dịch trong file báo cáo
          </p>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto mt-2">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left w-16">STT</th>
              <th className="py-2 px-4 border-b text-left w-28">Giờ</th>
              <th className="py-2 px-4 border-b text-left w-32">Trụ bơm</th>
              <th className="py-2 px-4 border-b text-left w-40">Mặt hàng</th>
              <th className="py-2 px-4 border-b text-right w-32">Số lượng</th>
              <th className="py-2 px-4 border-b text-right w-32">Đơn giá</th>
              <th className="py-2 px-4 border-b text-right w-40">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-left">{item.No}</td>
                <td className="py-2 px-4 text-left">{item.time}</td>
                <td className="py-2 px-4 text-left">{item.pump}</td>
                <td className="py-2 px-4 text-left">{item.product}</td>
                <td className="py-2 px-4 text-right">{item.quantity}</td>
                <td className="py-2 px-4 text-right">
                  {item.unitPrice.toLocaleString("vi-VN")} VNĐ
                </td>
                <td className="py-2 px-4 text-right">
                  {item.totalAmount.toLocaleString("vi-VN")} VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chuyển trang */}
      {/* Mobile*/}
      <div className="flex items-center gap-2 sm:hidden justify-center items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center bg-gray-500 text-white px-2 py-1 rounded 
                 hover:bg-gray-600 disabled:opacity-50 h-8 text-sm"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Trước
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPage}
          className="flex items-center bg-gray-500 text-white px-2 py-1 rounded 
                 hover:bg-gray-600 disabled:opacity-50 h-8 text-sm"
        >
          Sau <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden flex justify-center items-center mt-4 gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex flex-row justify-center items-center bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50 h-8"
        >
          <ArrowLeft className="mr-1" /> Trang trước
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => handlePageClick(page)}
              className={`h-8 w-8 rounded ${
                page === currentPage
                  ? "bg-gray-300 border border-gray-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPage}
          className="flex flex-row justify-center items-center bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50 h-8"
        >
          Trang sau <ArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}

export default DataTable;
