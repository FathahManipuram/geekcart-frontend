import { create } from "zustand"
import { fetchDashboardApi } from "../api/dashboard.api";

export const useDashboardStore = create((set) => ({
  userDetails: {},
  subcategoryBreakdown: [],

  loading: false,
  error: null,

  fetchDashboard: async () => {
    try {
      set({
        loading: true,
		error: null,
      });

      const res = await fetchDashboardApi();
console.log("dashboard data", res.data)
      set({
        userDetails: res.data.userDetails,
		subcategoryBreakdown: res.data.subcategoryBreakdown,
		loading: false
      });

	  return res
    } catch(err){
		const message= err.response?.data?.message || "Data fetching failed"
      set({
        loading: false,
		error: message,
      });
	  throw err
    }
  },
}));