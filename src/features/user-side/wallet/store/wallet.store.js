import { create } from "zustand";
import {
  createWalletTopupOrderApi,
  getWalletApi,
  getWalletTransactionsApi,
  verifyWalletTopupApi,
} from "../api/wallet.api";

export const useWalletStore = create((set) => ({
  loading: false,
  wallet: null,

  transactions: [],

  pagination: null,

  createWalletTopupOrder: async (amount) => {
    try {
      set({ loading: true });

      const { data } = await createWalletTopupOrderApi(amount);
      set({ loading: false });
      return data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  verifyWalletTopup: async (payload) => {
    try {
      set({ loading: true });

      const { data } = await verifyWalletTopupApi(payload);
      set({ loading: false });
      return data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  fetchWallet: async () => {
    try {
      set({ loading: true });

      const { data } = await getWalletApi();

      set({
        wallet: data,
        loading: false,
      });
      return data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  fetchTransactions: async (params) => {
    try {
      set({ loading: true });

      const { data } = await getWalletTransactionsApi(params);

      set({
        transactions: data.transactions,
        pagination: data.pagination,
        loading: false,
      });
      return data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },
}));
