import { Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { readExcelFile } from "../utils/excelProcessor";
import AnalyticsCard from "./AnalyticsCard";
import TimeFilter from "./TimeFilter";
import DataTable from "./DataTable";
import Swal from "sweetalert2";

function UploadFile() {
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [data, setData] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (file) {
      setFileName(file.name);

      // Tiến hành đọc file
      try {
        const data = await readExcelFile(file);
        setData(data);
      } catch (error) {
        console.error("Lỗi khi đọc file excel:", error);
        setData(null);
        setFileName("");
        // Hiện popup lỗi
        Swal.fire({
          icon: "error",
          title: "Lỗi khi đọc file Excel",
          text: error.message || "File không hợp lệ hoặc bị hỏng!",
          confirmButtonColor: "#ef4444", // Tailwind red-500
        });
      }
    }
  };

  // Khi chọn file bằng click
  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  // Khi kéo file vào
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  // Khi rời chuột ra ngoài
  const handleDragLeave = () => {
    setDragOver(false);
  };

  // Khi thả file vào
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleRemoveFile = () => {
    // Xóa file name và cả giá trị file
    setFileName("");
    setData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-4/5 mb-8">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${
            dragOver
              ? "border-gray-500 bg-gray-50"
              : "border-gray-300 hover:bg-gray-100"
          }`}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 p-2 text-gray-500" />
          <p className="mt-3 mb-2 text-sm text-gray-600 text-center">
            <span className="font-semibold">Nhấp để tải lên</span>{" "}
            <p className="hidden md:block">hoặc kéo thả file vào đây</p>
          </p>
          <p className="text-xs text-gray-500">File Excel (.xlsx, .xls)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          onChange={handleChange}
        />
      </label>
      {fileName && (
        <div className="flex flex-row items-center gap-2 mt-3 w-full justify-between border border-green-200 bg-green-50 text-green-300 px-4 py-2 rounded">
          <p className="text-sm text-green-600">{fileName}</p>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="p-1 text-red-500 hover:bg-red-100 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}
      {data && <AnalyticsCard data={data} />}
      {data && <TimeFilter data={data.details} />}
      {data && <DataTable data={data.details} />}
    </div>
  );
}

export default UploadFile;
