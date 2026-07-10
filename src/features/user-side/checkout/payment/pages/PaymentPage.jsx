import { useNavigate } from "react-router-dom";
import CheckoutStepper from "../../components/CheckoutStepper";
import PaymentMethodCard from "../components/PaymentMethodCard";
import OrderSummary from "../../components/OrderSummary";
import { useCheckoutStore } from "../../store/checkout.store";
import { useCartStore } from "@/features/user-side/cart/store/cart.store";
import { CHECKOUT_STEPS } from "../../constants/checkoutSteps";
import { PAYMENT_METHODS } from "../../constants/paymentMethods";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CheckoutItemsPreview from "../../components/CheckoutItemsPreview";
import CouponModal from "../components/coupon/CouponModal";
import AppliedCouponCard from "../components/coupon/AppliedCouponCard";
import { useWalletStore } from "@/features/user-side/wallet/store/wallet.store";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [couponModalOpen, setCouponModalOpen] = useState(false);

  const selectedPaymentMethod = useCheckoutStore(
    (state) => state.selectedPaymentMethod,
  );
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
  const selectedAddress = useCheckoutStore((state) => state.selectedAddress);
  const validatePayment = useCheckoutStore((state) => state.validatePayment);
  const couponDiscount = useCheckoutStore((state) => state.couponDiscount);
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const speedCharge = useCheckoutStore((state) => state.speedCharge);
  const availableCoupons = useCheckoutStore((state) => state.availableCoupons);
  const selectedDeliveryMethod = useCheckoutStore(
    (state) => state.selectedDeliveryMethod,
  );
  const fetchAvailableCoupons = useCheckoutStore(
    (state) => state.fetchAvailableCoupons,
  );
  const summary = useCartStore((state) => state.summary);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchWallet = useWalletStore((state) => state.fetchWallet);
  const wallet = useWalletStore((state) => state.wallet);
  const cart = useCartStore((state) => state.cart);

  const finalAmount =
    (speedCharge ? summary.total + speedCharge : summary.total) -
    couponDiscount;
  useEffect(() => {
    fetchCart();
    fetchWallet();
  }, []);

  useEffect(() => {
    fetchAvailableCoupons();
  }, [couponModalOpen]);

  useEffect(() => {
    if (!selectedAddress) {
      navigate("/checkout/shipping", { replace: true });
    }
  }, [selectedAddress, navigate]);

  useEffect(() => {
    if (cart?.items?.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleContinue = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    try {
      const res = await validatePayment({
        deliveryMethod: selectedDeliveryMethod,
        paymentMethod: selectedPaymentMethod,
        couponId: appliedCoupon?._id,
      });

      if (!res.valid) {
        toast.error(res.issues[0]?.message);
        return;
      }
      navigate("/checkout/review");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to validate payment");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={2} />

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-2 text-3xl font-bold">Payment Method</h1>

          <p className="text-muted-foreground mb-8">
            Select how you would like to complete your purchase.
          </p>

          <div className="space-y-4">
            {PAYMENT_METHODS.map((method) => (
              <PaymentMethodCard
                key={method.id}
                value={method.id}
                method={method}
                selected={selectedPaymentMethod === method.id}
                onSelect={setPaymentMethod}
                wallet={wallet}
                orderTotal={finalAmount}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <OrderSummary
          subtotal={summary.subtotal}
          deliveryCharge={summary?.deliveryCharge + speedCharge || 0}
          shippingCharge={summary?.deliveryCharge || 0}
          speedCharge={speedCharge}
          couponDiscount={couponDiscount}
          code={appliedCoupon?.code}
          discount={summary.discount}
          total={speedCharge ? summary.total + speedCharge : summary.total}
          buttonText="Review Order"
          onButtonClick={handleContinue}
          children={
            <>
              <CheckoutItemsPreview cart={cart} />
              <AppliedCouponCard onOpenModal={() => setCouponModalOpen(true)} />
            </>
          }
        />
      </div>

      <CouponModal
        open={couponModalOpen}
        onOpenChange={setCouponModalOpen}
        coupons={availableCoupons}
      />
    </section>
  );
};

export default PaymentPage;
