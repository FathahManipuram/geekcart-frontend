import adminApi from "@/services/adminApi";

export const fetchProductsApi=async(params)=> adminApi.get("/admin/products", {params})

export const createProductApi= async(formData)=> adminApi.post("/admin/products", formData, {
	headers:{"Content-Type": "multipart/form-data"},
})

export const updateProductApi= async(productId, formData)=> adminApi.patch(`/admin/products/${productId}`, formData, {headers:{"Content-Type": "multipart/form-data"},})

export const deleteproductApi= async(productId)=> adminApi.delete(`/admin/products/${productId}`)

export const fetchProductDetailsApi= async(slug)=> adminApi.get(`/admin/products/${slug}`)