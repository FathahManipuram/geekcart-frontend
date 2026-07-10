import { create } from "zustand";

import {
  addToCartApi,
  clearCartApi,
  fetchCartApi,
  removeCartItemApi,
  updateCartQuantityApi,
} from "../api/cart.api";

export const useCartStore = create((set, get) => ({
  cart: null,
  items: [],
  summary: {},
  changes: [],

  loading: false,
  error: null,

  fetchCart: async () => {
    try {
      set({
        loading: true,

        error: null,
      });

      const res = await fetchCartApi();

      const cart = res.data || {};

      set({
        cart,
        items: cart?.items || [],
        summary: cart?.summary || {},
        changes: cart.changes || [],
        loading: false,
      });

      return res;
    } catch (err) {
      set({
        loading: false,

        error: err.response?.data?.message || "Failed to fetch cart",
      });

      throw err;
    }
  },

  //addTocart
  addToCart: async ({
    variantId,

    quantity = 1,
  }) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await addToCartApi({
        variantId,

        quantity,
      });
      set({
        loading: false,
      });

      await get().fetchCart();

      return res;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to add to cart",
      });

      throw err;
    }
  },

  updateQuantity: async (variantId, quantity) => {
    try {
      if (quantity > 5) {
        return;
      }

      if (quantity < 1) {
        return;
      }

      const res = await updateCartQuantityApi(variantId, {
        quantity,
      });

      await get().fetchCart();
      return res;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add to cart",
      });

      throw err;
    }
  },

  removeFromCart: async (variantId) => {
    try {
      set({ loading: true, error: null });
      const res = await removeCartItemApi(variantId);
      set({ loading: false });

      await get().fetchCart();
      return res;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to add to cart",
      });

      throw err;
    }
  },

  clearCart: async () => {
    try {
      set({ loading: true, error: null });
      const res = await clearCartApi();
      set({ items: [], summary: {}, loading: false });
      return res;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to add to cart",
      });

      throw err;
    }
  },

  isInCart: (variantId) => {
    return get().items.some((item) => item.variantId._id === variantId);
  },
}));
