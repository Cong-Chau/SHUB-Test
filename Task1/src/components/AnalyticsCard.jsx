import { ShoppingCart, HandCoins, Box } from "lucide-react";

function AnalyticsCard({ data }) {
  return (
    <div className="w-full mt-4">
      <div className="font-semibold w-full pl-1 text-xl">
        Thống kê {data.generalInfo[0].station} ngày{" "}
        {data.generalInfo[2].fromDate.split(" - ")[0]}
      </div>
      {/* Nội dung của AnalyticsCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-2">
        {/* Số lượng giao dịch */}
        <div className="h-auto border border-gray-200 rounded-md p-4 flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold">Tổng giao dịch</p>
            <ShoppingCart className="w-4 h-4" />
          </div>
          <span className="font-bold text-xl">{data.details.length}</span>
          <span className="text-sm text-gray-500">giao dịch đã diễn ra</span>
        </div>

        {/* Tổng doanh thu */}
        <div className="h-auto border border-gray-200 rounded-md p-4 flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold">Tổng doanh thu</p>
            <HandCoins className="w-4 h-4" />
          </div>
          <span className="font-bold text-xl">
            {data.generalInfo[3].totalAmount} VNĐ
          </span>
          <span className="text-sm text-gray-500">tổng doanh thu</span>
        </div>

        {/* Tổng bán ra */}
        <div className="h-auto border border-gray-200 rounded-md p-4 flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold">Lượng bán ra</p>
            <Box className="w-4 h-4" />
          </div>
          <span className="font-bold text-xl">
            {data.generalInfo[3].totalLiters} lít
          </span>
          <span className="text-sm text-gray-500">đã bán ra</span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
