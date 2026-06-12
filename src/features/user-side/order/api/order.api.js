import userApi from "@/services/userApi";

export const createOrderApi = async (payload) =>
  userApi.post("/orders", payload);

export const fetchOrderByIdApi = (orderId) =>
  userApi.get(`/orders/success/${orderId}`);

export const cancelOrderApi = async (orderId, payload) =>
  userApi.patch(`/orders/${orderId}/cancel`, payload);
export const cancelOrderItemApi = async (orderId, itemId, payload) =>
  userApi.patch(`/orders/${orderId}/items/${itemId}/cancel`, payload);

export const fetchOrderHistoryApi = async (query={}) =>
  userApi.get("/orders/order-history", {params: query});


export const downloadInvoicePdfApi = async (orderId) => {
  return await userApi.get(`/orders/${orderId}/invoice`, {
    responseType: "blob", 
  });
};