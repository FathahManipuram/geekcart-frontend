import { create } from "zustand";
import { createRazorpayOrderApi, verifyPaymentApi } from "../api/payment.api";

export const usePaymentStore = create((set) => ({
  loading: false,
  error: null,

  createRazorpayOrder: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await createRazorpayOrderApi(payload);

      set({ loading: false });

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Razorpayment creation failed";
      set({ loading: false, error: message });

      throw err;
    }
  },

  verifyPayment: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await verifyPaymentApi(payload);

      set({ loading: false });

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Razorpayment creation failed";
      set({ loading: false, error: message });

      throw err;
    }
  },
}));
