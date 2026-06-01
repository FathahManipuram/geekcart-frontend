import { create } from "zustand";

import { fetchCollectionsApi } from "../api/collections.api";

export const useCollectionsStore = create((set, get) => ({
  /**
   * Data
   */
  products: [],

  pagination: {},

  loading: false,

  error: null,


  queryParams: {
    page: 1,

    limit: 8,

    search: "",

    subcategory: [],

    sizes: [],

    colors: [],

    sortBy: "latest",

    minPrice: "",

    maxPrice: "",
  },

  fetchCollections: async (params = {}) => {
    try {
     
      const currentParams = {
        ...get().queryParams,

        ...params,
      };

    
      if (
        params.search !== undefined ||
        params.subcategory !== undefined ||
        params.sizes !== undefined ||
        params.colors !== undefined ||
        params.minPrice !== undefined ||
        params.maxPrice !== undefined ||
        params.sortBy !== undefined
      ) {
        currentParams.page = 1;
      }

    
      set({
        loading: true,

        error: null,

        queryParams: currentParams,
      });

   
      const query = new URLSearchParams();

      Object.entries(currentParams).forEach(([key, value]) => {
        
        if (Array.isArray(value)) {
         
          if (value.length === 0) {
            return;
          }

          value.forEach((item) => {
            query.append(key, item);
          });
        } else if (value !== "" && value !== undefined && value !== null) {

          query.append(key, value);
        }
      });

  
      const res = await fetchCollectionsApi(query.toString());
console.log("Collection store: ",res.data)

      set({
        products: res.data.products,

        pagination: res.data.pagination,
      });

      return res;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch collections";

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

  /**
   * Change Page
   */
  changePage: async (page) => {
    await get().fetchCollections({
      page,
    });
  },
}));
