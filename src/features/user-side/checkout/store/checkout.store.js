import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyCouponApi, getAvailableCouponsApi, validateCheckoutApi, validatePaymentApi, validateShippingApi } from "../api/checkout.api";


export const useCheckoutStore = create(
  persist(
    (set,get) => ({
      loading: false,
      error: null,

      selectedAddress: null,
      selectedDeliveryMethod: "STANDARD",
      selectedPaymentMethod: "COD",

      availableCoupons: [],
      appliedCoupon: null,
      couponDiscount: 0,

      speedCharge: 0,

      setSelectedAddress: (address) => set({ selectedAddress: address }),
      setDeliveryMethod: (method) => set({ 
        selectedDeliveryMethod: method,
        speedCharge: method==="EXPRESS"? 25 : 0,
        }),
      setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

      validateCheckout: async () => {
        const res = await validateCheckoutApi();
        console.log("checkoutValidation: ", res.data);
        return res.data;
      },

      validateShipping: async (payload) => {
        const res = await validateShippingApi(payload);
        console.log(res.data);
        return res.data;
      },

      validatePayment: async (payload) => {
        const res = await validatePaymentApi(payload);
        return res.data;
      },

      resetCheckout: () =>
        set({
          selectedAddress: null,
          selectedDeliveryMethod: "STANDARD",
          selectedPaymentMethod: "COD",

          availableCoupons: [],
          appliedCoupon: null,
          couponDiscount: 0,
          speedCharge:0,
        }),

      //Coupon

      //fetch all coupon
      fetchAvailableCoupons: async () => {
        try {
          set({ loading: true });

          const { data } = await getAvailableCouponsApi();

          set({
            availableCoupons: data,
            loading: false,
          });
console.log("availableCoupon store:", data)
          return data;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      //Applycoupon
      applyCoupon: async (couponCode) => {
        console.log("appliedcoupon:", get().appliedCoupon);
        try {
          set({ loading: true });

          const { data } = await applyCouponApi(couponCode);

          set({
            appliedCoupon: {
              _id: data.couponId,
              code: data.couponCode,
            },

            couponDiscount: data.discount,
            loading: false,
          });

          return data;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      removeAppliedCoupon: () =>
        set({
          appliedCoupon: null,
          couponDiscount: 0,
        }),
    }),
    {
      name: "checkout-storage",
      partialize: (state) => ({
        selectedAddress: state.selectedAddress,
        selectedDeliveryMethod: state.selectedDeliveryMethod,
        selectedPaymentMethod: state.selectedPaymentMethod,
        availableCoupons: state.availableCoupons,
        couponDiscount: state.couponDiscount,
        appliedCoupon: state.appliedCoupon,
        speedCharge: state.speedCharge,
      }),
    },
  ),
);