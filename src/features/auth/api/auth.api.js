import api from "@/services/axios"


export const registerApi= (data)=> api.post("/auth/register", data)

export const resendOtpApi= (data)=> api.post("/auth/resend-otp", data)

export const loginApi= (data)=> api.post ("/auth/login", data)

export const forgotPasswordApi = (data)=> api.post("/auth/forgot-password", data)

export const verifyOtpApi= (data)=> api.post("/auth/verify-otp", data)

export const resetPasswordApi= (data)=> api.post("/auth/reset-password", data)

export const logout= ()=> api.post("/auth/logout")

export const googleLoginApi= (token)=> api.post("/auth/google-login", {token})

export const adminLoginApi= (data)=> api.post("auth/admin/login", data)