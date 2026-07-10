import { create } from "zustand";

import { fetchHomeDataApi } from "../api/home.api";

export const useHomeStore = create((set) => ({
  categories: [],
  newDrops: [],
  offers: [],

  loading: false,
  error: null,

  fetchHomeData: async () => {
    try {
      set({
        loading: true,

        error: null,
      });

      const res = await fetchHomeDataApi();

      set({
        categories: res.data.categories,

        newDrops: res.data.newDrops,
        offers: res.data.offers,

        loading: false,
      });

      return res;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch home data";

      set({
        loading: false,

        error: message,
      });

      throw err;
    }
  },
}));
