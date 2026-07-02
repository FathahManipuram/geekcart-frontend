import adminApi from "@/services/adminApi";

export const fetchDashboardApi = async (type = "monthly") =>
  adminApi.get("/admin/dashboard", {
    params: { type },
  });
