import { create } from "zustand";
import { cancelOrderApi, createOrderApi, fetchOrderByIdApi } from "../api/order.api";


export const useOrderStore = create((set) => ({

order: null,
loading: false,
error: null,


  createOrder: async (payload) => {
    const res = await createOrderApi(payload);
	console.log("Order placed: ", res.data)
    return res;
  },

  fetchOrderById: async (orderId) => {
	try{
		set({loading: true, error: null})

    const res = await fetchOrderByIdApi(orderId);
      set({order:res.data, loading: false });

	  	console.log("fetchedOrderById: ", res.data);
    return res.data;
	}catch(err){
		const message= err.response?.data?.message
		set({ loading: false, error: message });
		throw err
	}
  },

cancelOrder: async(orderId, payload)=>{
	try{
		set({ loading: true, error: null });

		const res= await cancelOrderApi(orderId, payload)

		set({ loading: false });

		return res.data
	}catch(err){
		const message= err.response?.data?.message || "Failed to cancel"
		set({ loading: false, error: message });
		throw err
	}
},

  
}));
