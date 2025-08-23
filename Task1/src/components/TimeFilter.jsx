import { useState } from "react";
import { Clock } from "lucide-react";

import { toSeconds } from "../utils/toSeconds";

function TimeFilter({ data }) {
  console.log(data);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [revenue, setRevenue] = useState(null);

  // Xử lý tính toán doanh thu trong khoảng thời gian nhập vào
  const handleCalculateRevenue = () => {
    if (!startTime || !endTime) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // chuyển HH:mm thành giây để so sánh
    const startSec = toSeconds(startTime);
    const endSec = toSeconds(endTime);

    if (startSec > endSec) {
      alert("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
      return;
    }

    // tổng doanh thu theo khoảng giờ
    let totalRevenue = 0;
    data.forEach((item) => {
      const itemSec = toSeconds(item.time);
      if (itemSec >= startSec && itemSec <= endSec) {
        totalRevenue += item.totalAmount; // trực tiếp cộng số
      }
    });

    setRevenue(totalRevenue);
  };

  return (
    <div className="w-full mt-4 p-4 border border-gray-200 rounded-md">
      <h1 className="font-semibold text-2xl flex flex-row items-center">
        <Clock className="mr-2" />
        Tính toán doanh thu theo khoảng thời gian
      </h1>
      <p className="text-sm text-gray-500 pl-1">
        Nhập thời gian bắt đầu và kết thúc để tính doanh thu trong khoảng thời
        gian cụ thể
      </p>
      <div className="grid grid-cols-3 gap-4 mt-2 items-end">
        <label className="font-semibold">
          <p>Giờ bắt đầu</p>
          <input
            type="Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full h-10 mt-1"
          />
        </label>
        <label className="font-semibold">
          <p>Giờ kết thúc</p>
          <input
            type="Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full h-10 mt-1"
          />
        </label>

        <button
          className=" bg-blue-500 text-white rounded-md p-2 h-10 hover:bg-blue-600 transition-colors"
          onClick={handleCalculateRevenue}
        >
          Tính toán
        </button>
      </div>
      {revenue && (
        <div className="flex flex-row justify-between mt-4 border border-green-200 bg-green-50 text-green-500 px-4 py-2 rounded">
          <p>
            Doanh thu trong khoảng {startTime}- {endTime} là:
          </p>
          <p className="font-bold">{revenue.toLocaleString("vi-VN")} VNĐ</p>
        </div>
      )}
    </div>
  );
}

export default TimeFilter;
