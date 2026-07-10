import { create } from "zustand";
import {
  createCategoryApi,
  deleteCategoryApi,
  fetchCategoryApi,
  updateCategoryApi,
} from "../api/category.api";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  pagination: {},
  loading: false,
  error: null,
  activeCategories: 0,
  totalCategories: 0,
  totalSubcategories: 0,
  queryParams: {
    page: 1,
    limit: 5,
    search: "",
    status: "",
  },

  //Get all category
  fetchCategories: async (params = {}) => {
    try {
      const currentParams = {
        ...get().queryParams,
        ...params,
      };
      set({
        loading: true,
        error: null,
        queryParams: currentParams,
      });
      const res = await fetchCategoryApi(currentParams);

      set({
        categories: res.data.categories,
        pagination: res.data.pagination,
        activeCategories: res.data.activeCategories,
        totalCategories: res.data.pagination.totalItems,
        totalSubcategories: res.data.totalSubcategories,
        loading: false,
      });
      return res;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch categories";
      set({
        loading: false,
        error: message,
      });
      throw err;
    }
  },

  //Change page
  changePage: async (page) => {
    await get().fetchCategories({ page });
  },

  //Create category
  createCategory: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await createCategoryApi(data);
      await get().fetchCategories(get().queryParams);
      set({ loading: false });
      return res;
    } catch (err) {
      const message =
        err.response?.data?.message || "failed to create category";
      set({ loading: false, error: message });
      throw err;
    }
  },

  //UpdateCategory
  updateCategory: async (categoryId, data) => {
    try {
      set({ loading: true, error: null });
      const res = await updateCategoryApi(categoryId, data);
      await get().fetchCategories(get().queryParams);
      set((state) => ({
        categories: state.categories.map((category) =>
          category._id === categoryId ? res.data : category,
        ),
        loading: false,
      }));
      return res;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update category";
      set({ loading: false, error: message });
      throw err;
    }
  },

  // Delete category
  deleteCategory: async (categoryId) => {
    try {
      set({ loading: true, error: null });
      const res = await deleteCategoryApi(categoryId);
      await get().fetchCategories(get().queryParams);
      set((state) => ({
        categories: state.categories.filter(
          (category) => category._id !== categoryId,
        ),
        loading: false,
      }));
      return res;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to delete category";
      set({ loading: false, error: message });
      throw err;
    }
  },
}));
