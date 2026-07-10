import adminApi from "@/services/adminApi";

export const getSalesReportApi = async (params) =>
  adminApi.get("/admin/sales-report", { params });

export const downloadSalesExcelApi = async (params) =>
  adminApi.get("/admin/sales-report/export/excel", {
    params,
    responseType: "blob",
  });

export const downloadSalesPdfApi = async (params) =>
  adminApi.get("/admin/sales-report/export/pdf", {
    params,
    responseType: "blob",
  });
