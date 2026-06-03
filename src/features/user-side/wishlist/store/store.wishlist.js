import { create } from "zustand";
import { addToWishlistApi, fetchWishlistApi, removeWishlistApi } from "../api/api.wishlist";



export const useWishlistStore = create((set, get) => ({
  wishlist: [],

  loading: false,
  error: null,

  fetchWishlist: async () => {
    try {
      set({ loading: true, error: null });
      const res = await fetchWishlistApi();
      console.log("wishlistStore : ", res.data.products);
      set({
        wishlist: res.data.products || [],
        loading: false,
      });
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch wishlist";
      set({ loading: false, error: message });
      throw err;
    }
  },

  addToWishlist: async (productId, variantId) => {
    if (!productId || !variantId) return;
    try {
      set({ loading: true, error: null });

      const res = await addToWishlistApi({
        productId,
        variantId,
      });

      const newItem = {
        productId:
          typeof productId === "object" ? productId : { _id: productId },
        variantId:
          typeof variantId === "object" ? variantId : { _id: variantId },
      };

      set({
        wishlist: [...get().wishlist, newItem],
        loading: false,
      });

      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch wishlist";
      set({ loading: false, error: message });
      throw err;
    }
  },

  isWishlisted: (variantId) => {
    if (!variantId) return false;

    const targetId = typeof variantId === "object" ? variantId._id : variantId;

    return get().wishlist.some((item) => {
      const itemVariantId = item.variantId?._id || item.variantId;
      return itemVariantId === targetId;
    });
  },

  removeFromWishlist: async (variantId) => {
    if (!variantId) return;
    const targetId = typeof variantId === "object" ? variantId._id : variantId;

    try {
      set({ loading: true, error: null });
      const res = await removeWishlistApi(targetId);

      set({
        wishlist: get().wishlist.filter((item) => {
          const itemVariantId = item.variantId?._id || item.variantId;
          return itemVariantId !== targetId;
        }),
        loading: false,
      });

      return res;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to remove from wishlist";
      set({ loading: false, error: message });
      throw err;
    }
  },

  toggleWishlist: async ({ productId, variantId }) => {
    if (!productId || !variantId) return;

    const targetVariantId =
      typeof variantId === "object" ? variantId._id : variantId;
    const previousWishlist = get().wishlist; 
    const exists = get().isWishlisted(targetVariantId);

    if (exists) {
      set({
        wishlist: previousWishlist.filter((item) => {
          const itemVariantId = item.variantId?._id || item.variantId;
          return itemVariantId !== targetVariantId;
        }),
      });
    } else {
      const newItem = {
        productId:
          typeof productId === "object" ? productId : { _id: productId },
        variantId:
          typeof variantId === "object" ? variantId : { _id: variantId },
      };
      set({
        wishlist: [...previousWishlist, newItem],
      });
    }

    try {
      if (exists) {
        await removeWishlistApi(targetVariantId);
      } else {
        await addToWishlistApi({ productId, variantId: targetVariantId });
      }
    } catch (err) {
      
      set({ wishlist: previousWishlist });

      const message =
        err.response?.data?.message || "Failed to update wishlist";
      set({ error: message });
      throw err; 
    }
  },
}));