import { useEffect, useState } from "react";
import OrderHistoryCard from "../components/order-history/OrderHistoryCard";
import OrderHistorySkeleton from "../components/order-history/OrderHistorySkeleton";
import { useOrderStore } from "../store/order.store";
import EmptyPage from "@/shared/components/EmptyPage";
import { PackageX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import SearchInput from "@/shared/components/SearchInput";
import useDebounce from "@/shared/hooks/useDebounce";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce(search, 500);

  const orderHistory = useOrderStore((state) => state.orderHistory);
  const loading = useOrderStore((state) => state.loading);
  const fetchOrderHistory = useOrderStore((state) => state.fetchOrderHistory);

  useEffect(() => {
    fetchOrderHistory({
      search: debouncedValue,
    });
  }, [debouncedValue]);

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-8">
        <Breadcrumbs
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Order History",
            },
          ]}
        />
        <h1 className="text-4xl font-bold">Order History</h1>

        <p className="text-muted-foreground mt-2">
          Manage your past purchases and track current deliveries.
        </p>
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
        placeholder="Search by order number or product name..."
      />

      <div className="mt-6 space-y-6">
        {loading ? (
          <>
            <OrderHistorySkeleton />
            <OrderHistorySkeleton />
            <OrderHistorySkeleton />
          </>
        ) : orderHistory?.length > 0 ? (
          orderHistory.map((order) => (
            <OrderHistoryCard key={order._id} order={order} />
          ))
        ) : (
          <EmptyPage
            icon={PackageX}
            title="No Orders Yet"
            description="You haven't placed any orders yet. Start shopping and your orders will appear here."
            buttonText="Start Shopping"
            onButtonClick={() => navigate("/collections")}
          />
        )}
      </div>
    </section>
  );
};

export default OrderHistoryPage;
