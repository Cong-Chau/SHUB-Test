import "./App.css";
import UploadFile from "./components/UploadFile";
function App() {
  return (
    <div className="min-h-screen flex flex-col items-center mt-8">
      <header className="text-center space-y-2">
        <h1 className="font-bold text-3xl md:text-5xl">
          Báo cáo doanh thu cửa hàng xăng dầu
        </h1>
        <p className="text-sm md:text-lg text-gray-600 mb-8">
          Hệ thống phân tích dữ liệu doanh thu
        </p>
      </header>
      <UploadFile />
    </div>
  );
}

export default App;
