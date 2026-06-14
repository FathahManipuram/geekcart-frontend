import userApi from "@/services/userApi";

export const createRazorpayOrderApi= async(payload)=> userApi.post("/payments/create-order", payload) 
export const verifyPaymentApi= async(payload)=> userApi.post("/payments/verify", payload)