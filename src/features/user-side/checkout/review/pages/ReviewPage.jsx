import React, { useEffect, useState } from "react";
import { CHECKOUT_STEPS } from "../../constants/checkoutSteps";
import CheckoutStepper from "../../components/CheckoutStepper";
import ReviewAddressCard from "../components/ReviewAddressCard";
import ReviewPaymentCard from "../components/ReviewPaymentCard";
import ReviewOrderItems from "../components/ReviewOrderItems";
import OrderSummary from "../../components/OrderSummary";
import { useCartStore } from "@/features/user-side/cart/store/cart.store";
import { useCheckoutStore } from "../../store/checkout.store";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/features/user-side/order/store/order.store";
import ReviewDeliveryCard from "../components/ReviewDeliveryCard";
import { toast } from "sonner";
import { usePaymentStore } from "@/features/user-side/payment/store/payment.store";
import { loadRazorpay } from "@/shared/helpers/loadRazorpay";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const selectedAddress = useCheckoutStore((state) => state.selectedAddress);
  const selectedPaymentMethod = useCheckoutStore(
    (state) => state.selectedPaymentMethod,
  );
  const selectedDeliveryMethod = useCheckoutStore(
    (state) => state.selectedDeliveryMethod,
  );
  const cart = useCartStore((state) => state.cart);
  const summary = useCartStore((state) => state.summary);
  const speedCharge = useCheckoutStore((state) => state.speedCharge);
  const createOrder = useOrderStore((state) => state.createOrder);
  const createRazorpayOrder = usePaymentStore(
    (state) => state.createRazorpayOrder,
  );
  const verifyPayment = usePaymentStore((state) => state.verifyPayment);
  const couponDiscount = useCheckoutStore((state) => state.couponDiscount);
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const finalValidation = useCheckoutStore((state) => state.finalValidation);

  useEffect(() => {
    if (cart?.items?.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  useEffect(() => {
    if (!selectedAddress) {
      navigate("/checkout/shipping", { replace: true });
      return;
    }

    if (!selectedPaymentMethod) {
      navigate("/checkout/payment", {
        replace: true,
      });
    }
  }, [selectedAddress, selectedPaymentMethod, navigate]);

  const handleRazorpayPayment = async () => {
    try {
      setProcessing(true);

      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error("Failed to load Razorpay");
        setProcessing(false);
        return;
      }

      const finalAmount = cart.summary.total + speedCharge - couponDiscount;

      const razorpayOrder = await createRazorpayOrder({
        amount: finalAmount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "GeekCart",
        description: "Order Payment",

        handler: async (response) => {
          try {
            const verifyRes = await verifyPayment(response);
            if (!verifyRes?.verified) {
              throw new Error("Payment verification failed");
            }

            const orderRes = await createOrder({
              addressId: selectedAddress?._id,
              deliveryMethod: selectedDeliveryMethod,
              paymentMethod: selectedPaymentMethod,
              couponId: appliedCoupon?._id,

              paymentDetails: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            });

            setProcessing(false);

            toast.success(orderRes.message);

            navigate(`/orders/success/${orderRes?.data?.orderNumber}`, {
              state: {
                orderId: orderRes.data.orderId,
              },
            });
          } catch (err) {
            console.error(err);

            setProcessing(false);
            navigate("/orders/payment-failed", {
              state: {
                reason: "Payment verification failed.",
              },
            });

            toast.error(
              err?.response?.data?.message ||
                err?.message ||
                "Order creation failed",
            );
          }
        },

        modal: {
          ondismiss: () => {
            setProcessing(false);

            navigate("/orders/payment-failed", {
              state: {
                reason: "Payment was cancelled by user.",
              },
            });

            toast.error("Payment cancelled");
          },
        },

        prefill: {
          name: selectedAddress?.fullName || "",
          contact: selectedAddress?.phone || "",
        },

        theme: {
          color: "#825026",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (err) {
      console.error(err);

      navigate("/orders/payment-failed", {
        state: {
          reason: "Payment failed. Please try again.",
        },
      });

      setProcessing(false);

      toast.error("Failed to initiate payment");
    }
  };

  const handlePlaceOrder = async () => {
    if (processing) return;

    try {
      setProcessing(true);

      await finalValidation({
        addressId: selectedAddress._id,
        deliveryMethod: selectedDeliveryMethod,
        paymentMethod: selectedPaymentMethod,
        couponId: appliedCoupon?._id,
      });

      if (["COD", "WALLET"].includes(selectedPaymentMethod)) {
        const orderRes = await createOrder({
          addressId: selectedAddress._id,
          deliveryMethod: selectedDeliveryMethod,
          paymentMethod: selectedPaymentMethod,
          couponId: appliedCoupon?._id,
        });

        toast.success(orderRes.message);

        navigate(`/orders/success/${orderRes.data.orderNumber}`, {
          state: {
            orderId: orderRes.data.orderId,
          },
        });

        return;
      }

      await handleRazorpayPayment();
    } catch (err) {
      console.error(err);

      setProcessing(false);

      toast.error(err?.response?.data?.message || "Order creation failed");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={3} />

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ReviewAddressCard
            address={selectedAddress}
            onEdit={() => navigate("/checkout/shipping")}
          />

          <ReviewDeliveryCard
            selectedDeliveryMethod={selectedDeliveryMethod}
            onEdit={() => navigate("/checkout/shipping")}
          />

          <ReviewPaymentCard
            selectedPaymentMethod={selectedPaymentMethod}
            onEdit={() => navigate("/checkout/payment")}
          />

          <ReviewOrderItems />
        </div>

        <OrderSummary
          subtotal={summary.subtotal}
          deliveryCharge={summary?.deliveryCharge + speedCharge || 0}
          shippingCharge={summary?.deliveryCharge || 0}
          speedCharge={speedCharge}
          couponDiscount={couponDiscount}
          code={appliedCoupon?.code}
          discount={summary.discount}
          total={speedCharge ? summary.total + speedCharge : summary.total}
          buttonText={processing ? "Processing..." : "Place Order"}
          buttonDisabled={processing}
          onButtonClick={handlePlaceOrder}
        />
      </div>
    </section>
  );
};

export default ReviewPage;
