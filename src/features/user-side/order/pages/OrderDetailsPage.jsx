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
import { ITEM_STATUSES, ORDER_STATUSES } from "@/shared/constants/order/orderStatus";
import { useCancelOrderItem } from "../hooks/useCancelOrderItem";
import { PackageX } from "lucide-react";
import EmptyPage from "@/shared/components/EmptyPage";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate= useNavigate()
  const[showCancelModal, setShowCancelModal]= useState(false)
  const [selectedItem, setSelectedItem] = useState(null)


  const order = useOrderStore((state) => state.order);
  const loading = useOrderStore((state) => state.loading);
  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);
  const downloadInvoicePdf= useOrderStore((state)=> state.downloadInvoicePdf)
  const {handleCancelOrder, isLoading}= useCancelOrder({orderId, onSuccess: ()=> setShowCancelModal(false)})
  const {handleCancelOrderItem, cancelOrderItemLoading}= useCancelOrderItem({orderId, itemId: selectedItem?._id, onSuccess: ()=> setShowCancelModal(false)})
  console.log("selectedItem", selectedItem)

const isItemCancellation= !!selectedItem
console.log("isItemCancellation: ", isItemCancellation)

const canCancelOrder= order?.items?.every((item)=> [ITEM_STATUSES.PLACED, ITEM_STATUSES.PROCESSING].includes(item.itemStatus))
const delivered = order?.orderStatus === "DELIVERED";

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId, fetchOrderById]);


  if (loading) {
    return <Loader/>
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
    <section className="max-w-7xl mx-auto px-4 py-8">
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
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold">Order Details</h1>

          <p className="text-gray-500 mt-2">Order #{order?.orderNumber}</p>
        </div>
        <div className="flex gap-2">
          {canCancelOrder && (
            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Order
            </Button>
          )}
          {order.orderStatus !== ORDER_STATUSES.CANCELLED && (
            <Button
              className="cursor-pointer"
              onClick={() => navigate(`/orders/${orderId}/tracking`)}
            >
              Track Package
            </Button>
          )}

          {delivered && (
            <>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => navigate(`/orders/${order._id}/return`)}
              >
                Return Item
              </Button>
            </>
          )}
          {order.orderStatus === "DELIVERED" && (
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => downloadInvoicePdf(orderId)}
            >
              Download invoice
            </Button>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <OrderTimeline order={order} />

          <div className="space-y-4">
            {order?.items?.map((item) => (
              <OrderItemCard
                key={item._id}
                item={item}
                order={order}
                onCancel={(item) => {
                  console.log("item", item);
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
