import adminApi from "@/services/adminApi";


export const fetchDashboardApi = async () => adminApi.get("/admin/dashboard");
