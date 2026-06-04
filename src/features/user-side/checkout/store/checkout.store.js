import { create } from "zustand";

export const useCheckoutStore = create((set, get) => ({
  loading: false,
  error: null,

  selectedAddress: null,
  selectedDeliveryMethod: "STANDARD",
  selectedPaymentMethod: "COD",

  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setDeliveryMethod: (method)=> set({selectedDeliveryMethod: method}),
  setPaymentMethod: (method)=> set({selectedPaymentMethod : method}),
}));