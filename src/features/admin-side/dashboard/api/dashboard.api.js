import adminApi from "@/services/adminApi";

export const fetchDashboardApi = async () => adminApi.get("/admin/dashboard");
export const exportSalesReportExcelApi = (params) => adminApi.get("/admin/reports/export/excel", {
    params,
    responseType: "blob",
  });