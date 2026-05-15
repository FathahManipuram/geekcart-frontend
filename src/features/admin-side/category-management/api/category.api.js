import adminApi from "@/services/adminApi";


export const fetchCategoryApi= async (params)=> adminApi.get("/admin/categories", {params})
export const createCategoryApi= async(data)=> adminApi.post("/admin/categories", data)
export const updateCategoryApi= async (categoryId, data)=>  adminApi.patch(`/admin/categories/${categoryId}`, data)