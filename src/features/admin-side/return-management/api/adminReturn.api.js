import adminApi from "@/services/adminApi";

export const getAllReturnRequestsApi= async(params)=> await adminApi.get("/admin/returns", {params})
export const updateReturnRequestApi= async(returnId, payload)=> adminApi.patch(`/admin/returns/${returnId}`, payload)