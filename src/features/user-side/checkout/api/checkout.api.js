import userApi from "@/services/userApi";

export const validateCheckoutApi = async () =>
  userApi.post("/checkout/validate");
  

export const validateShippingApi = async (payload) =>
  userApi.post("/checkout/shipping/validate", payload);

  export const validatePaymentApi= async(payload)=> userApi.post("/checkout/payment/validate", payload)