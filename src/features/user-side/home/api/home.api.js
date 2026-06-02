import userApi from "@/services/userApi.js";

export const fetchHomeDataApi = async () => userApi.get("/user/home");
