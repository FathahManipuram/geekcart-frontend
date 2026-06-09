import userApi from "@/services/userApi";

export const createReturnRequestApi = async (payload) =>
  userApi.post("/return/orders/return-request", payload);
