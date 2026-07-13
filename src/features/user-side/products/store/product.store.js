import { create } from "zustand";
import {
  fetchProductDetailsApi,
  getSimilarProductApi,
} from "../api/product.api";

export const useUserProductStore = create((set) => ({
  productDetails: [],
  similarProducts: [],

  loading: false,
  error: null,

  // fetch product details
  fetchProductDetails: async (slug) => {
    try {
      set({ loading: true, error: null });
      const res = await fetchProductDetailsApi(slug);

      set({ productDetails: res.data, loading: false, error: null });
      return res;
    } catch (err) {
      const message =
        err.response?.status === 404
          ? "Product not found"
          : err?.response?.data?.message || "Failed to fetch product";

      set({ 
        productDetails: null,
        loading: false, 
        error: message });
      throw err;
    }
  },

  // get Similar products
  fetchSimilarProducts: async (slug) => {
    try {
      set({ loading: true, error: null });
      const res = await getSimilarProductApi(slug);
      set({ similarProducts: res.data, loading: false });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete product";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
