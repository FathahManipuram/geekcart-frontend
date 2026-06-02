import userApi from "@/services/userApi";


export const addToCartApi = async (payload) => userApi.post("/cart", payload);

export const fetchCartApi = async () => userApi.get("/cart");

export const updateCartQuantityApi = async (variantId, payload) =>
  userApi.patch(`/cart/${variantId}`, payload);

export const removeCartItemApi = async (variantId) =>
  userApi.delete(`/cart/${variantId}`);

export const clearCartApi = async () => userApi.delete("/cart/clear/all");
