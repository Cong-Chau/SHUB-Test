TASK2

🛠️ Cách thực hiện

- Khởi tạo dự án bằng Vite + React.
- Cài đặt thư viện: TailwindCSS, Lucide, Yup.
- Tổ chức code đơn giản trong thư mục `src`:
  - App.jsx: Component gốc
  - main.jsx: Entry point render React
  - index.css: Global style (Tailwind)
  - assets/: Chứa hình ảnh, CSS bổ sung
- Xây dựng chức năng: giao diện cơ bản + validation với Yup.
- Hoàn thiện: chạy dev để kiểm thử (npm run dev), build khi deploy.

📂 Cấu trúc dự án

TASK2/
├── node_modules/ # Thư viện cài đặt từ npm
├── public/ # Tài nguyên tĩnh
├── src/ # Mã nguồn chính
│ ├── assets/ # Hình ảnh, CSS, fonts...
│ ├── App.jsx # Component gốc
│ ├── index.css # Global style (TailwindCSS)
│ └── main.jsx # Entry point của ứng dụng
├── .gitignore # Bỏ qua file/thư mục khi commit git
├── eslint.config.js # Cấu hình eslint
├── index.html # File HTML gốc
├── package.json # Thông tin dự án và dependencies
├── package-lock.json # Lock version dependencies
├── vite.config.js # Cấu hình Vite
└── README.txt # Tài liệu mô tả dự án

---

⚙️ Cách cài đặt & chạy dự án

1. Yêu cầu

- Node.js >= 18
- npm hoặc yarn hoặc pnpm

2. Cài đặt
   Clone repo về từ Github: https://github.com/Cong-Chau/SHUB-Test  
   Điều hướng vào thư mục Task2

3. Cài dependencies:
   npm install

4. Chạy trong môi trường dev:
   npm run dev  
   Ứng dụng sẽ chạy tại http://localhost:5173

🚀 Công nghệ sử dụng

- React 19
- Vite 7
- TailwindCSS 4
- Yup (Validation)
- Lucide React Icons
- ESLint
