import * as XLSX from "xlsx";
import {
  normalizeObjectKeys,
  keyMapGeneral,
  keyMapHeader,
} from "./normalizeData";

const EXPECTED_HEADER = [
  "STT",
  "Ngày",
  "Giờ",
  "Trạm",
  "Trụ bơm",
  "Mặt hàng",
  "Số lượng",
  "Đơn giá",
  "Thành tiền (VNĐ)",
  "Trạng thái thanh toán",
  "Mã khách hàng",
  "Tên khách hàng",
  "Loại khách hàng",
  "Ngày thanh toán",
  "Nhân viên",
  "Biển số xe",
  "Trạng thái hoá đơn",
];

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Lấy sheet đầu tiên
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Chuyển về mảng theo từng dòng
        const rawData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        if (rawData.length < 8) {
          return reject("File không hợp lệ");
        }

        // lấy thông tin các dòng thông tin chung
        const generalInfoRaw = rawData.slice(2, 7);
        const generalInfo = generalInfoRaw
          .map((row) => {
            // bỏ các phần tử rỗng
            const values = row.filter(
              (cell) => cell && cell.toString().trim() !== ""
            );
            if (values.length === 0) return null;

            // nếu có 2 item trở lên thì convert cặp key:value
            if (values.length >= 2) {
              const obj = {};
              for (let i = 0; i < values.length; i += 2) {
                const key = values[i];
                const value = values[i + 1] || "";
                obj[key] = value;
              }
              return normalizeObjectKeys(obj, keyMapGeneral);
            }

            // nếu chỉ có 1 item thì vẫn giữ lại
            return normalizeObjectKeys({ [values[0]]: "" }, keyMapGeneral);
          })
          .filter((item) => item !== null);

        // lấy hàng 8 làm tiêu đề
        const mainData = rawData.slice(7);
        const headers = mainData[0];
        const rows = mainData.slice(1);

        // Kiểm tra tiêu đề của các cột
        // Chuẩn hóa hàm để loại bỏ khoảng trắng và đồng bộ hóa tên
        const normalizeHeader = (str) =>
          str?.toString().trim().replace(/\s+/g, " ");

        // Chuẩn hóa cả 2 mảng
        const normalizedHeaders = headers.map(normalizeHeader);
        const normalizedExpected = EXPECTED_HEADER.map(normalizeHeader);

        // So sánh
        if (
          normalizedHeaders.length !== normalizedExpected.length ||
          !normalizedHeaders.every((h, i) => h === normalizedExpected[i])
        ) {
          return reject("Tiêu đề các cột không hợp lệ");
        }

        // Map thành JSON
        const details = rows.map((row) => {
          let obj = {};
          headers.forEach((header, index) => {
            const key = keyMapHeader[header] || header;
            obj[key] = row[index];
          });
          return obj;
        });

        resolve({ generalInfo, details });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
