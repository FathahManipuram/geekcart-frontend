import { create } from "zustand";
import {
  cancelOrderApi,
  cancelOrderItemApi,
  createOrderApi,
  downloadInvoicePdfApi,
  fetchOrderByIdApi,
  fetchOrderHistoryApi,
} from "../api/order.api";

export const useOrderStore = create((set) => ({
  order: null,
  orderHistory: [],
  loading: false,
  error: null,

  createOrder: async (payload) => {
    const res = await createOrderApi(payload);
    return res;
  },

  fetchOrderById: async (orderId) => {
    try {
      set({ loading: true, error: null });

      const res = await fetchOrderByIdApi(orderId);
      set({ order: res.data, loading: false });

      return res.data;
    } catch (err) {
      const message = err.response?.data?.message;
      set({ loading: false, error: message });
      throw err;
    }
  },

  fetchOrderHistory: async (query) => {
    try {
      set({ loading: true, error: null });

      const res = await fetchOrderHistoryApi(query);

      set({ orderHistory: res.data.orders, loading: false });

      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed";
      set({ loading: false, error: message });
      throw err;
    }
  },

  cancelOrder: async (orderId, payload) => {
    try {
      set({ loading: true, error: null });

      const res = await cancelOrderApi(orderId, payload);

      set({ loading: false });

      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to cancel";
      set({ loading: false, error: message });
      throw err;
    }
  },

  cancelOrderItem: async (orderId, itemId, payload) => {
    try {
      set({ loading: true, error: null });

      const res = await cancelOrderItemApi(orderId, itemId, payload);

      set({ loading: false });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to cancel";
      set({ loading: false, error: message });
      throw err;
    }
  },

  downloadInvoicePdf: async (orderId) => {
    try {
      const res = await downloadInvoicePdfApi(orderId);

      const rawData = res.data ? res.data : res;

      if (!rawData || rawData.size === 0) {
        throw new Error("Received empty invoice data from server");
      }

      const blob = new Blob([rawData], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${orderId}.pdf`;

      document.body.appendChild(link);
      link.click();

      // Clean up memory leaks
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Invoice Download Error:", err);
      const message =
        err.response?.data?.message || "Failed to download invoice";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
