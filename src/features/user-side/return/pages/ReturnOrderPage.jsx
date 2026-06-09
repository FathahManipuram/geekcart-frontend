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

const ReturnOrderPage = () => {
  const { orderId } = useParams();
  const navigate= useNavigate()

  const [selectedItems, setSelectedItems] = useState([]);
  const order = useOrderStore((state) => state.order);
  const loading = useOrderStore((state) => state.loading);

  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

  const createReturnRequest= useReturnStore((state)=>state.createReturnRequest)
  const returnLoading= useReturnStore((state)=> state.loading)

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

  const handleToggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleToggleAll = () => {
    const allIds = order?.items?.map((item) => item._id) || [];

    setSelectedItems((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const handleSubmit = async(data) => {
	try{
		 const payload = {
      orderId,

      items: selectedItems,

      reason: data.reason === "Other" ? data.customReason : data.reason,
    };

	const res= await createReturnRequest(payload)

	toast.success(res.message || "Return requst successful")

    console.log("Return Payload:", payload);
	}catch(err){
		toast.error(err?.response?.data?.message || "Request failed")
	}
   
  };

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <div className="text-center py-20">Order not found</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="grid lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-10">
            <ReturnItemsSection
              items={order.items}
              selectedItems={selectedItems}
              onToggleItem={handleToggleItem}
              onToggleAll={handleToggleAll}
            />

            <ReturnReasonSection />
          </div>

          {/* Right Side */}

          <div className="space-y-6">
            <RefundSummaryCard
              items={order.items}
              selectedItems={selectedItems}
            />
            <ReturnPolicyCard />
            <button
              type="submit"
              disabled={selectedItems.length === 0 || returnLoading}
              className="
                w-full h-12
                bg-primary
                text-white
                rounded-lg
                disabled:opacity-50
              "
            >
              {returnLoading ? "Submitting" : "Submit Return Request"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full h-12 border rounded-lg font-medium disabled:opacity-50"
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
