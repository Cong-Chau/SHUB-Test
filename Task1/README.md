TASK1

🛠️ Cách thực hiện

Khởi tạo dự án bằng Vite + React.

Cài đặt thư viện: TailwindCSS, Lucide, SweetAlert2, XLSX.

Tổ chức code:

components/: giao diện & chức năng (UploadFile, DataTable, TimeFilter, AnalyticsCard).

utils/: xử lý dữ liệu Excel, chuẩn hóa, đổi thời gian.

Xây dựng chức năng chính: upload & đọc Excel → chuẩn hóa → lọc & hiển thị bảng → phân tích.

Hoàn thiện: kiểm thử (npm run dev).

📂 Cấu trúc dự án

TASK1/
├── node_modules/ # Thư viện cài đặt từ npm
├── public/ # Tài nguyên tĩnh
├── src/ # Mã nguồn chính
│ ├── assets/ # Tài nguyên tĩnh dành riêng cho React
│ ├── components/ # Các component React
│ │ ├── AnalyticsCard.jsx
│ │ ├── DataTable.jsx
│ │ ├── TimeFilter.jsx
│ │ └── UploadFile.jsx
│ ├── utils/ # Hàm tiện ích xử lý dữ liệu
│ │ ├── excelProcessor.js
│ │ ├── normalizeData.js
│ │ └── toSeconds.js
│ ├── App.jsx # Component gốc
│ ├── App.css # Style chính
│ ├── index.css # Global style
│ └── main.jsx # Entry point của ứng dụng
├── .gitignore # Bỏ qua file/thư mục khi commit git
├── eslint.config.js # Cấu hình eslint
├── index.html # File HTML gốc
├── package.json # Thông tin dự án và dependencies
├── vite.config.js # Cấu hình Vite
└── README.txt # Tài liệu mô tả dự án

---

⚙️ Cách cài đặt & chạy dự án

1. Yêu cầu

- Node.js >= 18
- npm hoặc yarn hoặc pnpm

2. Cài đặt
   Clone repo về từ Github: https://github.com/Cong-Chau/SHUB-Test
   Điều hướng vào thư mục Task1

3. Cài dependencies:
   npm install

4. Chạy trong môi trường dev
   npm run dev
   Ứng dụng sẽ chạy tại http://localhost:5173

5. Build cho production
   npm run build

6. Preview bản build
   npm run preview

7. Kiểm tra lint
   npm run lint

---

🚀 Công nghệ sử dụng

- React 19
- Vite 7
- TailwindCSS 4
- SweetAlert2
- Lucide React Icons
- XLSX
