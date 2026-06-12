import { Button } from "@/shared/components/ui/button";
import OrderStatusBadge from "../overview-page/OrderStatusBadge";
import { formatDateTime } from "@/shared/utils/date";

const OrderHeader = ({ order }) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">#{order?.orderNumber}</h1>

          <OrderStatusBadge status={order?.orderStatus} />
        </div>

        <p className="text-muted-foreground mt-2">
          {formatDateTime(order?.createdAt)}
        </p>
      </div>

      {/* <Button variant="outline">Print Invoice</Button> */}
    </div>
  );
};

export default OrderHeader;
