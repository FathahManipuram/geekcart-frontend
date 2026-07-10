import adminApi from "@/services/adminApi";

export const createSubcategoryApi = (data) =>
  adminApi.post("/admin/subcategories/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const fetchSubcategoriesApi = (params) =>
  adminApi.get("/admin/subcategories/", { params });

export const updateSubCategoryApi = (subcategoryId, data) =>
  adminApi.patch(`/admin/subcategories/${subcategoryId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteSubcategoryApi = (subcategoryId) =>
  adminApi.delete(`/admin/subcategories/${subcategoryId}`);
