import React, { useEffect } from 'react'
import { CHECKOUT_STEPS } from '../../constants/checkoutSteps';
import CheckoutStepper from '../../components/CheckoutStepper';
import ReviewAddressCard from '../components/ReviewAddressCard';
import ReviewPaymentCard from '../components/ReviewPaymentCard';
import ReviewOrderItems from '../components/ReviewOrderItems';
import OrderSummary from '../../components/OrderSummary';
import { useCartStore } from '@/features/user-side/cart/store/cart.store';
import { useCheckoutStore } from '../../store/checkout.store';
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const navigate=useNavigate()
	const selectedAddress= useCheckoutStore((state)=> state.selectedAddress)
	const selectedPaymentMethod=useCheckoutStore((state)=> state.selectedPaymentMethod)
  const cart = useCartStore((state) => state.cart);

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


  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={3} />

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-6">
          <ReviewAddressCard
            address={selectedAddress}
            onEdit={() => navigate("/checkout/shipping")}
          />

          <ReviewPaymentCard
            selectedPaymentMethod={selectedPaymentMethod}
            onEdit={() => navigate("/checkout/payment")}
          />

          <ReviewOrderItems />
        </div>

        <OrderSummary
          items={cart?.items || []}
          subtotal={cart?.summary?.subtotal || 0}
          shippingCharge={cart?.summary?.shippingCharge || 0}
          discount={cart?.summary?.discount || 0}
          total={cart?.summary?.total || 0}
          buttonText={"Place Order"}
        />
      </div>
    </section>
  );
};

export default ReviewPage
