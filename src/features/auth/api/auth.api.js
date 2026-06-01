import adminApi from "@/services/adminApi";
import userApi from "@/services/userApi"


export const registerApi= (data)=> userApi.post("/auth/register", data)

export const resendOtpApi = (data) => userApi.post("/auth/resend-otp", data);

export const loginApi = (data) => userApi.post("/auth/login", data);

export const forgotPasswordApi = (data) => userApi.post("/auth/forgot-password", data);

export const verifyOtpApi = (data) => userApi.post("/auth/verify-otp", data);

export const resetPasswordApi = (data) => userApi.post("/auth/reset-password", data);

export const logoutApi = () => userApi.post("/auth/logout");

export const googleLoginApi = (token) => userApi.post("/auth/google-login", { token });

export const userRefreshTokenApi= ()=> userApi.post("/auth/refresh-token")


//AdminApi
export const adminLoginApi= (data)=> adminApi.post("/auth/admin/login", data)

export const adminLogoutApi= ()=> adminApi.post("/auth/admin/logout")

export const adminRefreshTokenApi= ()=> adminApi.post("/auth/admin/refresh-token")