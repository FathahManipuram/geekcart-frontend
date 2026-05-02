import api from "@/services/axios"


export const registerApi= (data)=> api.post("/auth/register", data)

export const verifyEmailApi= (data)=> api.post("/auth/verify-email", data)

export const resendOtpApi= (data)=> api.post("/auth/resend-otp", data)

export const loginApi= (data)=> api.post ("/auth/login", data)

export const forgotPassword = (data)=> api.post("/auth/forgot-password", data)

export const verifyOtp= (data)=> api.post("/auth/verify-otp", data)

export const resetPassword= (data)=> api.post("/auth/reset-password", data)

export const logout= ()=> api.post("/auth/logout")