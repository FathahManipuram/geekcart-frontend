import { create } from "zustand"
import { exportSalesReportExcelApi, fetchDashboardApi } from "../api/dashboard.api";

export const useDashboardStore = create((set) => ({
  userDetails: {},
  subcategoryBreakdown: [],
  userGrowth: [],
  salesChart: [],
  topProducts: [],
  topSubcategories: [],

  loading: false,
  error: null,

  fetchDashboard: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await fetchDashboardApi();
      console.log("dashboard data", res.data);
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

  exportExcel: async (filters) => {
    const response = await exportSalesReportExcelApi(filters);

    const blob = new Blob([response.data]);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "sales-report.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  },
}));