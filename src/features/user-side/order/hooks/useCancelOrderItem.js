import { toast } from "sonner";
import { useOrderStore } from "../store/order.store";

export const useCancelOrderItem = ({ orderId, itemId, onSuccess }) => {
  const cancelOrderItem = useOrderStore((state) => state.cancelOrderItem);

  const loading = useOrderStore((state) => state.loading);

  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

  const handleCancelOrderItem = async (reason) => {
    if (loading) return;

    try {
      const payload = {
        reason: reason.trim(),
      };

      const res = await cancelOrderItem(orderId, itemId, payload);

      toast.success(res.message || "Item cancelled successfully!");

      onSuccess?.();

      await fetchOrderById(orderId);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return {
    handleCancelOrderItem,
    cancelOrderItemLoading: loading,
  };
};
