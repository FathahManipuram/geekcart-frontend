import { create } from "zustand";
import { createReturnRequestApi } from "../api/return.api";

export const useReturnStore = create((set) => ({
  loading: false,
  error: null,

  createReturnRequest: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await createReturnRequestApi(payload);

	  set({loading: false})
      return res
    } catch(err) {
		const message= err?.response?.data?.message || "Request failed"
      set({ loading: false, error: message});
    }
  },
}));
