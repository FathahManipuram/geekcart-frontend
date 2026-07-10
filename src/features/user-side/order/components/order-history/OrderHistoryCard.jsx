import { formatCurrency } from "@/shared/utils/formatCurrency";
import OrderHistoryActions from "./OrderHistoryActions";

const OrderHistoryCard = ({ order }) => {
  const firstItem = order?.items?.[0];

  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          <img
            src={firstItem?.image}
            alt={firstItem?.name}
            className="h-48 w-full rounded-xl object-cover sm:h-28 sm:w-28"
          />

          <div className="min-w-0 flex-1">
            <span className="bg-muted inline-block rounded-full px-3 py-1 text-xs font-medium">
              {order.orderStatus.replaceAll("_", " ")}
            </span>

            <p className="text-muted-foreground mt-2 text-xs break-all">
              #{order.orderNumber}
            </p>

            <h3 className="mt-2 truncate text-lg font-semibold text-gray-900 sm:text-xl">
              {firstItem?.name}
              {order.items.length > 1 && ` (+${order.items.length - 1} more)`}
            </h3>

            <p className="text-muted-foreground mt-1 text-sm">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 border-t border-gray-100 pt-4 md:flex-col md:items-end md:justify-between md:border-none md:pt-0">
          <div className="text-left md:text-right">
            <p className="text-muted-foreground text-xs tracking-wider uppercase">
              Order Total
            </p>
            <p className="mt-0.5 text-2xl font-bold text-gray-900 sm:text-3xl">
              ₹{formatCurrency(order.totalAmount)}
            </p>
          </div>

          <div className="flex w-auto justify-end md:w-full">
            <OrderHistoryActions order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
