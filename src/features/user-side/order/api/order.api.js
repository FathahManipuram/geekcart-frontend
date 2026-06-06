import userApi from "@/services/userApi";

export const createOrderApi = async (payload) =>
  userApi.post("/orders", payload);

export const fetchOrderByIdApi = (orderId) => userApi.get(`/orders/success/${orderId}`);

export const cancelOrderApi= async(orderId, payload)=> userApi.patch(`/orders/${orderId}/cancel`, payload)