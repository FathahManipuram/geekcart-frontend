import { create } from "zustand";
import { fetchDashboardApi } from "../api/dashboard.api";

export const useDashboardStore = create((set) => ({
  userDetails: {},
  subcategoryBreakdown: [],
  userGrowth: [],
  salesChart: [],
  topProducts: [],
  topSubcategories: [],
  sample: null,

  loading: false,
  error: null,

  fetchDashboard: async (payload) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await fetchDashboardApi(payload);
      set({
        userDetails: res.data.userDetails,
        subcategoryBreakdown: res.data.subcategoryBreakdown,
        userGrowth: res.data.userGrowth,
        salesChart: res.data.salesChart,
        topProducts: res.data.topProducts,
        topSubcategories: res.data.topSubcategories,
        loading: false,
      });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Data fetching failed";
      set({
        loading: false,
        error: message,
      });
      throw err;
    }
  },
}));
