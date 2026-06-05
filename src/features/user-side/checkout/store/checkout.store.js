import { create } from "zustand";
import { persist } from "zustand/middleware";
import { validateCheckoutApi, validatePaymentApi, validateShippingApi } from "../api/checkout.api";


export const useCheckoutStore = create(
  persist((set) => ({
    loading: false,
    error: null,

    selectedAddress: null,
    selectedDeliveryMethod: "STANDARD",
    selectedPaymentMethod: "COD",

    setSelectedAddress: (address) => set({ selectedAddress: address }),
    setDeliveryMethod: (method) => set({ selectedDeliveryMethod: method }),
    setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

    validateCheckout: async () => {
      const res = await validateCheckoutApi();
      console.log("checkoutValidation: ", res.data);
      return res.data;
    },

    validateShipping: async (payload) => {
      const res = await validateShippingApi(payload);
      console.log(res.data);
      return res.data;
    },

    validatePayment: async (payload) => {
      const res = await validatePaymentApi(payload);
      return res.data;
    },

    resetCheckout: () =>
      set({
        selectedAddress: null,
        selectedDeliveryMethod: "STANDARD",
        selectedPaymentMethod: "COD",
      }),
  }),{
    name: "checkout-storage",
    partialize: (state)=>({
      selectedAddress: state.selectedAddress,
      selectedDeliveryMethod: state.selectedDeliveryMethod,
      selectedPaymentMethod: state.selectedPaymentMethod
    })
  }),
);