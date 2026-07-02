import { formatCurrency } from "@/shared/utils/formatCurrency";
import OrderHistoryActions from "./OrderHistoryActions";

const OrderHistoryCard = ({ order }) => {
  const firstItem = order?.items?.[0];

  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <img
            src={firstItem?.image}
            alt={firstItem?.name}
            className="w-full sm:w-28 h-48 sm:h-28 rounded-xl object-cover"
          />

          <div className="flex-1 min-w-0">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted">
              {(order.orderStatus.replaceAll("_", " "))}
            </span>

            <p className="mt-2 text-xs text-muted-foreground break-all">
              #{order.orderNumber}
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mt-2 text-gray-900 truncate">
              {firstItem?.name}
              {order.items.length > 1 && ` (+${order.items.length - 1} more)`}
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>


        <div className="flex flex-row md:flex-col md:justify-between items-center md:items-end gap-4 pt-4 md:pt-0 border-t md:border-none border-gray-100">
          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Order Total
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-0.5">
              ₹{formatCurrency(order.totalAmount)}
            </p>
          </div>

          {/* Wrapper for the action buttons to handle full-width flow if needed inside OrderHistoryActions */}
          <div className="w-auto md:w-full flex justify-end">
            <OrderHistoryActions order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
