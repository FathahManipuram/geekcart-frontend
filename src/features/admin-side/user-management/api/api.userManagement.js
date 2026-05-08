import api from "@/services/axios";

export const getUsersApi= async ({page, limit, search})=> api.get("/admin/users/", {params:{page, limit, search,}})
export const getUserByIdApi= async (userId)=> api.get(`/admin/users/${userId}`)
export const deleteUserApi= async(userId)=> api.delete(`/admin/users/${userId}`)