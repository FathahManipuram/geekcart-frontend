import adminApi from "@/services/adminApi";

export const createCouponApi = async (payload) =>
  adminApi.post("/admin/coupons", payload);
export const fetchCouponsApi = async (params) =>
  adminApi.get("admin/coupons", { params });

export const getCuponDetailsApi= async(couponId)=> adminApi.get(`admin/coupons/${couponId}`)
  export const updateCouponApi= async(couponId, payload)=> adminApi.patch(`/admin/coupons/${couponId}`, payload)
  export const toggleUpdateStatusApi= async(couponId)=> adminApi.patch(`/admin/coupons/${couponId}/status`)
  export const deleteCouponApi= async(couponId)=> adminApi.delete(`/admin/coupons/${couponId}`)