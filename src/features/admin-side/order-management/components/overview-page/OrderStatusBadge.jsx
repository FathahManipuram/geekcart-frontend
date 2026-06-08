import { ORDER_STATUS_LABELS } from "@/shared/constants/order/orderStatusLabel";
import { ORDER_STATUS_COLORS } from "../../constants/orderStatusColor";


const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
        ORDER_STATUS_COLORS[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
};

export default OrderStatusBadge;
