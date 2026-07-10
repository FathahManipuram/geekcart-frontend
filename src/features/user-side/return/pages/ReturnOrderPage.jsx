import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { useOrderStore } from "../../order/store/order.store";

import ReturnItemsSection from "../components/ReturnItemsSection";
import ReturnReasonSection from "../components/ReturnReasonSection";

import Loader from "@/shared/components/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { returnOrderSchema } from "../validations/returnOrder.validation";
import RefundSummaryCard from "../components/RefundSummaryCard";
import ReturnPolicyCard from "../components/ReturnPolicyCard";
import { toast } from "sonner";
import { useReturnStore } from "../store/return.store";
import { ITEM_STATUSES } from "@/shared/constants/order/orderStatus";

const ReturnOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const order = useOrderStore((state) => state.order);
  const loading = useOrderStore((state) => state.loading);

  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

  const createReturnRequest = useReturnStore(
    (state) => state.createReturnRequest,
  );
  const returnLoading = useReturnStore((state) => state.loading);

  const methods = useForm({
    resolver: yupResolver(returnOrderSchema),
    defaultValues: {
      reason: "",
      customReason: "",
    },
  });

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);

  const returnableItems =
    order?.items?.filter(
      (item) => item.itemStatus === ITEM_STATUSES.DELIVERED,
    ) || [];

  const handleToggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleToggleAll = () => {
    const allIds = returnableItems.map((item) => item._id) || [];

    setSelectedItems((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        orderId,

        items: selectedItems,

        reason: data.reason === "Other" ? data.customReason : data.reason,
      };

      const res = await createReturnRequest(payload);

      toast.success(res.message || "Return request submitted successfully");
      setSelectedItems([]);
      methods.reset();
      navigate("/account/order-history");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Request failed");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (returnableItems.length === 0) {
    return (
      <section className="mx-auto max-w-4xl py-20 text-center">
        <h2 className="text-2xl font-semibold">No Returnable Items</h2>

        <p className="text-muted-foreground mt-2">
          All eligible items from this order have already been returned,
          cancelled, or are under review.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="grid gap-8 lg:grid-cols-3"
        >
          <div className="space-y-10 lg:col-span-2">
            <ReturnItemsSection
              items={returnableItems}
              selectedItems={selectedItems}
              onToggleItem={handleToggleItem}
              onToggleAll={handleToggleAll}
            />

            <ReturnReasonSection />
          </div>

          {/* Right Side */}

          <div className="space-y-6">
            <RefundSummaryCard
              items={returnableItems}
              selectedItems={selectedItems}
            />
            <ReturnPolicyCard />
            <button
              type="submit"
              disabled={selectedItems.length === 0 || returnLoading}
              className="bg-primary h-12 w-full rounded-lg text-white disabled:opacity-50"
            >
              {returnLoading ? "Submitting" : "Submit Return Request"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-12 w-full rounded-lg border font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default ReturnOrderPage;
