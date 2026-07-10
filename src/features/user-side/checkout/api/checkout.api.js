import userApi from "@/services/userApi";

export const validateCheckoutApi = async () =>
  userApi.post("/checkout/validate");

export const validateShippingApi = async (payload) =>
  userApi.post("/checkout/shipping/validate", payload);

export const validatePaymentApi = async (payload) =>
  userApi.post("/checkout/payment/validate", payload);

export const validateFinalCheckoutApi = async (payload) =>
  userApi.post("/checkout/validate-final", payload);

//Coupons

export const getAvailableCouponsApi = async () =>
  userApi.get("/coupons/available");
export const applyCouponApi = (couponCode) =>
  userApi.post("/coupons/apply-coupon", { couponCode });
