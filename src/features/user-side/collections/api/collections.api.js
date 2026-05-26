import userApi from "@/services/userApi";

export const fetchCollectionsApi = async (query) =>
  userApi.get(`/user/collections?${query}`);
