import adminApi from "@/services/adminApi";

export const getAllReturnRequestsApi = async (query) =>
  await adminApi.get("/admin/returns", { params: query });
export const updateReturnRequestStatusApi = async (returnId, payload) =>
  adminApi.patch(`/admin/returns/${returnId}/status`, payload);

export const getReturnRequestDetailsApi = async (returnId) =>
  adminApi.get(`/admin/returns/${returnId}`);
