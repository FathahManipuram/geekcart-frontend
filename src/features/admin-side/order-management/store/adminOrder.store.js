import { create } from "zustand";
import { fetchOrderDetailsApi, fetchOrdersApi, updateorderItemStatusApi, updateOrderStatusApi } from "../api/order.admin.api";

export const useAdminOrderStore = create((set, get) => ({
  orders: [],
  order: null,
  pagination: null,
  orderStats:null,

  loading: false,
  error: null,

  fetchOrders: async (params = {}) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await fetchOrdersApi(params);
	  console.log("ordemangementStore: ", res.data)

      set({
        orders: res.data.orders,
        pagination: res.data.pagination,
        orderStats: res.data.orderStats,
      });

      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch orders";

      set({
        error: message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },


  fetchOrderDetails: async(orderId)=>{
    if(!orderId) return 

    try{
      set({loading: true, error: null})

      const res= await fetchOrderDetailsApi(orderId)
      console.log("order", res.data)

      set({order: res.data})

      return res

    }catch(err){
      const message= err.response?.data?.message || "Failed to fetch details"
      set({error: message})

      throw err
    }finally{
      set({loading: false})
    }
  },


  updateOrderStatus: async(orderId, payload)=>{
    if(!orderId || !payload) return 
    try{
      set({loading: true, error: null})

      const res= await updateOrderStatusApi(orderId, payload)
      await get().fetchOrders()
console.log("updateStatustore: ", res.data)
      return res.data
    } catch(err){
      const message = err.response?.data?.message || "Failed to update order Status";
      set({ error: message });

      throw err;
    }finally{
      set({loading : false})
    }
  },


  updateOrderItemStatus: async(orderId, itemId, payload)=>{
    if (!orderId || !payload | !itemId) return;
    try {
      set({ loading: true, error: null });
console.log("ch:", orderId, itemId,payload)
      const res = await updateorderItemStatusApi(orderId, itemId, payload)
      await get().fetchOrders();
      console.log("updateitemStatustore: ", res);
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update order item status";
      set({ error: message });

      throw err;
    } finally {
      set({ loading: false });
    }
  }



}));
