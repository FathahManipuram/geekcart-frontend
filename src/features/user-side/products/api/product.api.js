import userApi from "@/services/userApi";

export const fetchProductDetailsApi = async (slug) =>
 userApi.get(`/products/${slug}`);

export const getSimilarProductApi = async (slug) =>
  userApi.get(`/products/${slug}/similar`);

