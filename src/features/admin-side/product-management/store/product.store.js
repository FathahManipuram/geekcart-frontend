import { create } from "zustand";
import { createProductApi, deleteproductApi, fetchProductDetailsApi, fetchProductsApi, updateProductApi } from "../api/product.api";

export const useProductStore = create((set, get) => ({
  products: [],
  pagination: {},
  categories: [],
  subcategories: [],
  productDetails: [],
  productStats: {},

  loading: false,
  error: null,

  queryParams: {
    page: 1,
    limit: 10,
    search: "",
    status: "",
    category: "",
    subcategory: "",
  },


  fetchProducts: async (params = {}) => {
    try {
   
      const currentParams = {
        ...get().queryParams,

        ...params,
      };

      
      const sanitizedParams = Object.fromEntries(
        Object.entries(currentParams).filter(
          ([_, value]) => value !== undefined && value !== null && value !== "",
        ),
      );

      set({
        loading: true,

        error: null,

        queryParams: currentParams,
      });

      const res = await fetchProductsApi(sanitizedParams);

      console.log("fetchedProductData:", res.data);

      set({
        products: res.data.products,

        productStats: res.data.stats,

        pagination: res.data.pagination,

        loading: false,
      });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch products";

      set({
        loading: false,

        error: message,
      });

      throw err;
    }
  },

  //Change page
  changePage: async (page) => {
    await get().fetchProducts({ page });
  },

  //Create product
  createProduct: async (formData) => {
    try {
      set({ loading: true, error: null });

      const res = await createProductApi(formData);

      await get().fetchProducts(get().queryParams);

      set({ loading: false });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create product";
      set({ loading: false, error: message });
      throw err;
    }
  },

  //Update Product
  updateProduct: async (productId, formData) => {
    try {
      set({ loading: true, error: null });

      const res = await updateProductApi(productId, formData);

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? res.data : product,
        ),
        loading: false,
      }));

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update product";
      set({ loading: false, error: message });
      throw err;
    }
  },

  //Soft delete
  deleteProduct: async (productId) => {
    try {
      set({
        loading: true,
        error: null,
      });

  
      const res = await deleteproductApi(productId);

  
      const { pagination, queryParams, products } = get();

     
      const currentPage = pagination?.currentPage || 1;

      
      const newPage =
        currentPage > 1 && products.length === 1
          ? currentPage - 1
          : currentPage;

     
      await get().fetchProducts({
        ...queryParams,
        page: newPage,
      });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete product";

      set({
        error: message,
      });

      throw err;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // fetch product details
  fetchProductDetails: async (slug) => {
    try {
      set({ loading: true, error: null });
      const res = await fetchProductDetailsApi(slug);
      console.log("Product details: ", res.data);

      set({ productDetails: res.data, loading: false });
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete product";

      set({ loading: false, error: message });
      throw err;
    }
  },

  //clear Error
  clearError: () => {
    set({ error: null });
  },
}));


