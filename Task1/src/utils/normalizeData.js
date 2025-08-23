// Map key tiếng Việt sang key code chuẩn
export const keyMapGeneral = {
  Chuỗi: "chain",
  Trạm: "station",
  "Loại báo cáo": "reportType",
  "Từ ngày": "fromDate",
  "Đến ngày": "toDate",
  "Tổng tiền": "totalAmount",
  "Tổng lít": "totalLiters",
};

export const keyMapHeader = {
  STT: "No",
  Ngày: "date",
  Giờ: "time",
  Trạm: "station",
  "Trụ bơm": "pump",
  "Mặt hàng": "product",
  "Số lượng": "quantity",
  "Đơn giá": "unitPrice",
  "Thành tiền (VNĐ)": "totalAmount",
  "Trạng thái thanh toán": "paymentStatus",
  "Mã khách hàng": "customerID",
  "Tên khách hàng": "customerName",
  "Loại khách hàng": "customerType",
  "Ngày thanh toán": "paymentDate",
  "Nhân viên": "employee",
  "Biển số xe": "licensePlate",
  "Trạng thái hoá đơn": "invoiceStatus",
};

// Hàm chuẩn hóa object key
export const normalizeObjectKeys = (obj, keyMap) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    const newKey = keyMap[key] || key; // nếu không có map thì giữ nguyên
    newObj[newKey] = obj[key];
  });
  return newObj;
};
