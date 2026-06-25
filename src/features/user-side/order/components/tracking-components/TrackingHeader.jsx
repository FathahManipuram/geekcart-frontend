import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { formatDateForDisplay } from "@/shared/utils/date";

const TrackingHeader = ({ order }) => {
  return (
    <div>
      <Breadcrumbs
        items={[
          {
            label: "Home",
            link: "/",
          },
          {
            label: "Order History",
            link: "/account/order-history",
          },
          {
            label: "Order Details",
            link: `/orders/${order._id}`,
          },
          {
            label: "Order Status",
          },
        ]}
      />

      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-3">
        #{order?.orderNumber}
      </h1>

      <p className="text-muted-foreground mt-3">
        Placed on {formatDateForDisplay(order?.createdAt)}
        {" • "}
        {/* Expected Delivery: {order?.expectedDeliveryDate} */}
      </p>
    </div>
  );
};

export default TrackingHeader;
