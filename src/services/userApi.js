import { createAxiosInstance } from "./createAxiosInstance";
import { setupInterceptors } from "./interceptors";

const userApi= createAxiosInstance()

setupInterceptors(userApi, "accessToken")

export default userApi