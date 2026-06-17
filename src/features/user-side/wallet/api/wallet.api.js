import userApi from "@/services/userApi";

export const createWalletTopupOrderApi = async (amount) =>
  userApi.post("/wallet/topup/create-order", {
    amount,
  });

export const verifyWalletTopupApi = async (payload) =>
  userApi.post("/wallet/topup/verify", payload);

export const getWalletApi = async () => userApi.get("/wallet");

export const getWalletTransactionsApi = async (params) =>
  userApi.get("/wallet/transactions", {
    params,
  });