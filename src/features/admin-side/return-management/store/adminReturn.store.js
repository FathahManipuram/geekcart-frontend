import { create } from "zustand"
import { getAllReturnRequestsApi, getReturnRequestDetailsApi,  updateReturnRequestStatusApi } from "../api/adminReturn.api"

export const useAdminReturnStore = create((set, get) => ({
  loading: false,
  error: null,

  returns: [],
  pagination: null,
  returnDetails: null,

  fetchAllReturns: async (query) => {
	console.log("params", query)
    try {
      set({ loading: true, error: null });

      const res = await getAllReturnRequestsApi(query);
      console.log("adminReturn Store: ", res);
	  console.log("returns here", res.data.pagination)

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
      console.log("updatedRequestatustore: ", res.data);

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
      console.log("adminReturnDetails Store: ", res.data);

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