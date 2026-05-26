import { create } from "zustand";

import { fetchHomeDataApi } from "../api/home.api";

export const useHomeStore = create((set, get) => ({
  categories: [],
  newDrops: [],

  loading: false,
  error: null,


    fetchHomeData:
      async () => {
        try {
          set({
            loading: true,

            error: null,
          });

          const res =
            await fetchHomeDataApi();

console.log("HomeStore: ", res.data)
          set({
            categories:
              res.data.categories,

            newDrops:
              res.data
                .newDrops,

            loading: false,
          });
		  console.log("fetchedHomestore; ", get().categories)

          return res;
        } catch (err) {
          const message =
            err.response?.data
              ?.message ||
            "Failed to fetch home data";

          set({
            loading: false,

            error: message,
          });

          throw err;
        }
      },



  
}));
