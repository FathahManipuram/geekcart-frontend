import OrderStatusBadge from "../overview-page/OrderStatusBadge";
import { formatDateTime } from "@/shared/utils/date";

const OrderHeader = ({ order }) => {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">#{order?.orderNumber}</h1>

          <OrderStatusBadge status={order?.orderStatus} />
        </div>

        <p className="text-muted-foreground mt-2">
          {formatDateTime(order?.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default OrderHeader;
