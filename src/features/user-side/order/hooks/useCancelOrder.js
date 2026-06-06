import { toast } from "sonner";
import { useOrderStore } from "../store/order.store";

export const useCancelOrder = ({orderId, onSuccess})=>{
	 const cancelOrder = useOrderStore((state) => state.cancelOrder);
	 const loading= useOrderStore((state)=> state.loading)

   const fetchOrderById = useOrderStore((state) => state.fetchOrderById);

   const handleCancelOrder= async(reason)=>{
	if(loading) return 
	try {
    const payload = {
      reason: reason.trim(),
    };

    const res = await cancelOrder(orderId, payload);

toast.success(res.message || "Order cancelled successfully!");
    
	onSuccess?.();
      await fetchOrderById(orderId);
      

  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to cancel order.");
  }
	
   }


   return{
	handleCancelOrder,
	isLoading: loading,
   }
}