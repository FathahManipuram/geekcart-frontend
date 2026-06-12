import adminApi from "@/services/adminApi";

export const fetchOrdersApi = async (params) => adminApi.get("/admin/orders", { params });
export const fetchOrderDetailsApi= async (orderId)=> adminApi.get(`/admin/orders/${orderId}`)

export const updateOrderStatusApi= async(orderId, payload)=> adminApi.patch(`/admin/orders/${orderId}/status`, payload)
export const updateorderItemStatusApi= async(orderId, itemId, payload)=> adminApi.patch(`/admin/orders/${orderId}/items/${itemId}/status`, payload)