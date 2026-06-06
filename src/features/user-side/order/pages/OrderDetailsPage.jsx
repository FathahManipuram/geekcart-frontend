import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderStore } from "../store/order.store";
import OrderTimeline from "../components/OrderTimeline";
import OrderItemCard from "../components/OrderItemCard";
import OrderSummaryCard from "../components/OrderSummaryCard";
import ShippingAddressCard from "../components/ShippingAddressCard";
import PaymentInfoCard from "../components/PaymentInfoCard";
import Loader from "@/shared/components/Loader";
import { Button } from "@/shared/components/ui/button";
import CancelOrderModal from "../components/cancel-components/CancelOrderModal";
import { useCancelOrder } from "../hooks/useCancelOrder";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate= useNavigate()
  const[showCancelModal, setShowCancelModal]= useState(false)


  const order = useOrderStore((state) => state.order);
  const loading = useOrderStore((state) => state.loading);
  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

  const {handleCancelOrder, isLoading}= useCancelOrder({orderId, onSuccess: ()=> setShowCancelModal(false)})



  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId, fetchOrderById]);




  if (loading) {
    return <Loader/>
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold">Order Details</h1>

          <p className="text-gray-500 mt-2">Order #{order.orderNumber}</p>
        </div>
        <div className="flex gap-2">
          {["PLACED", "PROCESSING"].includes(order.orderStatus) && (
            <Button
              onClick={() => setShowCancelModal(true)}
              variant="destructive"
            >
              Cancel Order
            </Button>
          )}
          <Button onClick={() => navigate(`/orders/${orderId}/tracking`)}>
            Track Package
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <OrderTimeline order={order} />

          <div className="space-y-4">
            {order.items.map((item) => (
              <OrderItemCard key={item.variantId} item={item} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <OrderSummaryCard order={order} />

          <ShippingAddressCard address={order.shippingAddress} />

          <PaymentInfoCard order={order} />
        </div>
      </div>
      <CancelOrderModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        order={order}
        loading={isLoading}
        onSubmit={handleCancelOrder}
      />
    </section>
  );
};

export default OrderDetailsPage;
