import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import * as Yup from "yup";

const schema = Yup.object().shape({
  time: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Thiếu thời gian giao dịch"),

  quantity: Yup.number()
    .typeError("Số lượng phải là số")
    .positive("Số lượng phải > 0")
    .required("Thiếu số lượng"),

  pump: Yup.string().required("Chưa chọn trụ"),

  revenue: Yup.number()
    .typeError("Doanh thu phải là số")
    .min(0, "Doanh thu phải >= 0")
    .required("Thiếu doanh thu"),

  price: Yup.number()
    .typeError("Đơn giá phải là số")
    .positive("Đơn giá phải > 0")
    .required("Thiếu đơn giá"),
});

function App() {
  const [values, setValues] = useState({
    time: "",
    quantity: "",
    pump: "",
    revenue: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  // validate từng field khi nhập
  const validateField = async (field, value) => {
    try {
      await schema.validateAt(field, { ...values, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const handleChange = (field, e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      alert("✅ Hợp lệ: " + JSON.stringify(values, null, 2));
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[400px] mx-auto border border-gray-200 bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 hover:cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm text-gray-600">Đóng</span>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700"
          >
            Cập nhật
          </button>
        </div>

        {/* Title */}
        <div className="px-4 pb-2 shadow-bottom-md">
          <h1 className="text-2xl font-bold">Nhập giao dịch</h1>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          {/* Thời gian */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Thời gian
            </label>
            <input
              type="datetime-local"
              value={values.time}
              onChange={(e) => handleChange("time", e)}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.time ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time}</p>
            )}
          </div>

          {/* Số lượng */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">Số lượng</label>
            <input
              type="text"
              value={values.quantity}
              onChange={(e) => handleChange("quantity", e)}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.quantity ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>

          {/* Trụ */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">Trụ</label>
            <select
              value={values.pump}
              onChange={(e) => handleChange("pump", e)}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.pump ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Chọn trụ</option>
              <option value="1">Trụ 1</option>
              <option value="2">Trụ 2</option>
              <option value="3">Trụ 3</option>
            </select>
            {errors.pump && (
              <p className="text-red-500 text-sm">{errors.pump}</p>
            )}
          </div>

          {/* Doanh thu */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Doanh thu
            </label>
            <input
              type="text"
              value={values.revenue}
              onChange={(e) => handleChange("revenue", e)}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.revenue ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.revenue && (
              <p className="text-red-500 text-sm">{errors.revenue}</p>
            )}
          </div>

          {/* Đơn giá */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">Đơn giá</label>
            <input
              type="text"
              value={values.price}
              onChange={(e) => handleChange("price", e)}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.price ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
