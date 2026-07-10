import adminApi from "@/services/adminApi";

export const getUsersApi = async ({ page, limit, search, status }) =>
  adminApi.get("/admin/users/", { params: { page, limit, search, status } });
export const getUserByIdApi = async (userId) =>
  adminApi.get(`/admin/users/${userId}`);
export const deleteUserApi = async (userId) =>
  adminApi.delete(`/admin/users/${userId}`);
export const blockUserApi = async (userId) =>
  adminApi.patch(`/admin/users/${userId}/block`);
export const createUserApi = async (data) =>
  adminApi.post("/admin/users/create-user/", data);
export const updateUserApi = async (userId, data) =>
  adminApi.patch(`/admin/users/edit-user/${userId}`, data);
