import { ENV } from "@/shared/config/env";
import { setupInterceptors } from "./interceptors";
import { createAxiosInstance } from "./createAxiosInstance";

const adminApi= createAxiosInstance()

setupInterceptors(adminApi, "adminAccessToken")

export default adminApi