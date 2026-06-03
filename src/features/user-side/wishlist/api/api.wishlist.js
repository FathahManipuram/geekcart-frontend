import userApi from "@/services/userApi";

export const addToWishlistApi = (data) => userApi.post("/wishlist", data);

export const fetchWishlistApi = () => userApi.get("/wishlist");

export const removeWishlistApi = (variantId) =>
  userApi.delete(`/wishlist/${variantId}`);
