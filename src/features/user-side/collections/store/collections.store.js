import { create } from "zustand";

import { fetchCollectionsApi } from "../api/collections.api";

export const useCollectionsStore = create((set, get) => ({
  products: [],

  pagination: {},

  loading: false,

  error: null,



  fetchCollections: async (params = {}) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const query = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            query.append(key, item);
          });
        } else if (value !== "" && value !== undefined && value !== null) {
          query.append(key, value);
        }
      });

      const res = await fetchCollectionsApi(query.toString());

      set({
        products: res.data.products,
        pagination: res.data.pagination,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch collections",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
