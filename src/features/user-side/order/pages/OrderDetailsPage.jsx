import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderStore } from "../store/order.store";
import OrderTimeline from "../components/order-main/OrderTimeline";
import OrderItemCard from "../components/order-main/OrderItemCard";
import OrderSummaryCard from "../components/order-main/OrderSummaryCard";
import ShippingAddressCard from "../components/order-main/ShippingAddressCard";
import PaymentInfoCard from "../components/order-main/PaymentInfoCard";
import Loader from "@/shared/components/Loader";
import { Button } from "@/shared/components/ui/button";
import CancelOrderModal from "../components/cancel-components/CancelOrderModal";
import { useCancelOrder } from "../hooks/useCancelOrder";
import {
  ITEM_STATUSES,
  ORDER_STATUSES,
} from "@/shared/constants/order/orderStatus";
import { useCancelOrderItem } from "../hooks/useCancelOrderItem";
import { PackageX } from "lucide-react";
import EmptyPage from "@/shared/components/EmptyPage";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const order = useOrderStore((state) => state.order);
  const loading = useOrderStore((state) => state.loading);
  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);
  const downloadInvoicePdf = useOrderStore((state) => state.downloadInvoicePdf);
  const { handleCancelOrder, isLoading } = useCancelOrder({
    orderId,
    onSuccess: () => setShowCancelModal(false),
  });
  const { handleCancelOrderItem, cancelOrderItemLoading } = useCancelOrderItem({
    orderId,
    itemId: selectedItem?._id,
    onSuccess: () => setShowCancelModal(false),
  });

  const isItemCancellation = !!selectedItem;

  const canCancelOrder = order?.items?.every((item) =>
    [ITEM_STATUSES.PLACED, ITEM_STATUSES.PROCESSING].includes(item.itemStatus),
  );
  const delivered = order?.orderStatus === "DELIVERED";

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId, fetchOrderById]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return (
      <EmptyPage
        icon={PackageX}
        title="Order Not Found"
        description="The order you are looking for does not exist, has been removed, or the link may be invalid."
        buttonText="Back to Orders"
        onButtonClick={() => navigate("/account/order-history")}
      />
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:py-8">
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
          },
        ]}
      />

      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            Order Details
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
            Order #{order?.orderNumber}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2">
          {canCancelOrder && (
            <Button
              className="w-full cursor-pointer sm:w-auto"
              variant="destructive"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Order
            </Button>
          )}
          {order.orderStatus !== ORDER_STATUSES.CANCELLED && (
            <Button
              className="w-full cursor-pointer sm:w-auto"
              onClick={() => navigate(`/orders/${orderId}/tracking`)}
            >
              Track Package
            </Button>
          )}

          {delivered && (
            <Button
              className="w-full cursor-pointer sm:w-auto"
              variant="outline"
              onClick={() => navigate(`/orders/${order._id}/return`)}
            >
              Return Item
            </Button>
          )}

          {order.orderStatus === "DELIVERED" && (
            <Button
              className="w-full cursor-pointer sm:w-auto"
              variant="outline"
              onClick={() => downloadInvoicePdf(orderId)}
            >
              Download invoice
            </Button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <OrderTimeline order={order} />

          <div className="space-y-4">
            {order?.items?.map((item) => (
              <OrderItemCard
                key={item._id}
                item={item}
                order={order}
                onCancel={(item) => {
                  setSelectedItem(item);
                  setShowCancelModal(true);
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <OrderSummaryCard order={order} />

          <ShippingAddressCard address={order?.shippingAddress} />

          <PaymentInfoCard order={order} />
        </div>
      </div>

      <CancelOrderModal
        open={showCancelModal}
        onOpenChange={(open) => {
          setShowCancelModal(open);
          if (!open) {
            setSelectedItem(null);
          }
        }}
        order={order}
        item={selectedItem}
        loading={isItemCancellation ? cancelOrderItemLoading : isLoading}
        onSubmit={
          isItemCancellation ? handleCancelOrderItem : handleCancelOrder
        }
      />
    </section>
  );
};

export default OrderDetailsPage;
