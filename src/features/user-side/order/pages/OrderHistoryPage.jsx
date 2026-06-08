import { useEffect } from "react";
import OrderHistoryCard from "../components/order-history/OrderHistoryCard";
import OrderHistorySkeleton from "../components/order-history/OrderHistorySkeleton";
import { useOrderStore } from "../store/order.store";

const OrderHistoryPage = () => {
  const orderHistory = useOrderStore((state) => state.orderHistory);
  const loading = useOrderStore((state) => state.loading);
  const fetchOrderHistory= useOrderStore((state)=> state.fetchOrderHistory)
console.log("LoadinG: ", loading)
  useEffect(() => {
    fetchOrderHistory()
  }, []);

console.log("orderhistorypage: ", orderHistory)
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Order History</h1>

        <p className="text-muted-foreground mt-2">
          Manage your past purchases and track current deliveries.
        </p>
      </div>

      <div className="space-y-6">
        {loading ? (
          <>
            <OrderHistorySkeleton />
            <OrderHistorySkeleton />
            <OrderHistorySkeleton />
          </>
        ) : (
          orderHistory?.map((order) => (
            <OrderHistoryCard key={order._id} order={order} />
          ))
        )}
      </div>
    </section>
  );
};

export default OrderHistoryPage;
