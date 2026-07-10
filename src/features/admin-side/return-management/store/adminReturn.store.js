import { create } from "zustand";
import {
  getAllReturnRequestsApi,
  getReturnRequestDetailsApi,
  updateReturnRequestStatusApi,
} from "../api/adminReturn.api";

export const useAdminReturnStore = create((set) => ({
  loading: false,
  error: null,

  returns: [],
  pagination: null,
  returnDetails: null,

  fetchAllReturns: async (query) => {
    try {
      set({ loading: true, error: null });

      const res = await getAllReturnRequestsApi(query);
      set({
        loading: false,
        returns: res.data.returns,
        pagination: res.data.pagination,
      });

      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to fetch return data";
      set({ loading: false, error: message });
      throw err;
    }
  },

  updateReturnRequestStatus: async (returnId, payload) => {
    try {
      set({ loading: true, error: null });

      const res = await updateReturnRequestStatusApi(returnId, payload);

      set({ loading: false });

      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to fetch return data";

      set({ loading: false, error: message });
    }
  },

  getReturnRequestDetails: async (returnId) => {
    try {
      set({ loading: true, error: null });

      const res = await getReturnRequestDetailsApi(returnId);

      set({ loading: false, returnDetails: res.data });

      return res;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to fetch return details";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
