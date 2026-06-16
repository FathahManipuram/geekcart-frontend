import { create } from "zustand";
import { createCouponApi, deleteCouponApi, fetchCouponsApi, getCuponDetailsApi, toggleUpdateStatusApi, updateCouponApi } from "../api/coupon.api";

export const useCouponStore = create((set, get) => ({
  coupons: [],
  coupon: null,
  pagination: {},

  loading: false,
  error: null,

  createCoupon: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await createCouponApi(payload);

      set({
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to create coupon",
      });

      throw err;
    }
  },

  fetchCoupons: async (query = {}) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await fetchCouponsApi(query);
      console.log("Coupon store: ", res);
      set({
        coupons: res.data.coupons,
        pagination: res.data.pagination,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch coupons",
      });

      throw error;
    }
  },

  updateCoupon: async(couponId, payload)=>{
	try {
    console.log("updationdata Store: ", couponId, payload)
    set({ loading: true, error: null });

    const res = await updateCouponApi(couponId, payload);

    set({
      loading: false,
	  coupons: res.data.coupons
    });

    return res.data;
  } catch (err) {
    set({
      loading: false,
      error: err.response?.data?.message || "Failed to update coupon",
    });

    throw err;
  }
  },


  toggleStatusUpdate: async(couponId)=>{
	try {
    set({ loading: true, error: null });

    const res = await toggleUpdateStatusApi(couponId)

      await get().fetchCoupons()

    return res.data;
  } catch (err) {
    set({
      loading: false,
      error: err.response?.data?.message || "Failed to update coupon status",
    });

    throw err;
  }
  },


  deleteCoupon: async(couponId)=>{
	try {
    set({ loading: true, error: null });

    const res = await deleteCouponApi(couponId)

  await get().fetchCoupons()
    return res;
  } catch (err) {
    set({
      loading: false,
      error: err.response?.data?.message || "Failed to delete coupon",
    });

    throw err;
  }
  },

  getCouponDetails: async(couponId)=>{
	 try {
     set({
       loading: true,
       error: null,
     });

     const res = await getCuponDetailsApi(couponId)
     console.log("Coupon details: ", res);
     set({
       coupon: res.data,
       loading: false,
     });

     return res.data;
   } catch (error) {
     set({
       loading: false,
       error: error.response?.data?.message || "Failed to fetch coupon details",
     });

     throw error;
   }
  }

}));
