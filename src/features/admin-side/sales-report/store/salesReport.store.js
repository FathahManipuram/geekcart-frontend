import { create } from "zustand";
import { downloadSalesExcelApi, downloadSalesPdfApi, getSalesReportApi } from "../api/salesReport.api";
import Pagination from "@/shared/components/Pagination";

export const useSalesReportStore = create((set) => ({
  loading: false,
  error: null,

  salesReport: [],
  pagination: {},
  summary: {},

  getSalesReport: async (params) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getSalesReportApi(params);
      console.log("dashboard salesdata", res.data);
      set({
        salesReport: res.data.orders,
        pagination: res.data.pagination,
        summary: res.data.summary,
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

  downloadSalesExcel: async (filters) => {
    const blob = await downloadSalesExcelApi(filters);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "sales-report.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  },

  downloadSalesPdf: async (filters) => {
    const blob = await downloadSalesPdfApi(filters);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `sales-report.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  },
}));
