import api from "@/services/axios";

export const getUsersApi= async ({page, limit, search, status})=> api.get("/admin/users/", {params:{page, limit, search, status}})
export const getUserByIdApi= async (userId)=> api.get(`/admin/users/${userId}`)
export const deleteUserApi= async(userId)=> api.delete(`/admin/users/${userId}`)
export const blockUserApi= async(userId)=> api.patch(`/admin/users/${userId}/block`)
export const createUserApi= async(data)=> api.post("/admin/users/create-user/", data)
export const updateUSerApi= async(userId, data)=> api.patch(`/admin/users/edit-user/${userId}`,data)