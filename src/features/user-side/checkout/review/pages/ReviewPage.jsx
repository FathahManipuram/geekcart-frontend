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
import { useOrderStore } from '@/features/user-side/order/store/order.store';
import ReviewDeliveryCard from '../components/ReviewDeliveryCard';
import { toast } from 'sonner';

const ReviewPage = () => {
  const navigate=useNavigate()
	const selectedAddress= useCheckoutStore((state)=> state.selectedAddress)
	const selectedPaymentMethod=useCheckoutStore((state)=> state.selectedPaymentMethod)
  const selectedDeliveryMethod= useCheckoutStore((state)=> state.selectedDeliveryMethod)
  const cart = useCartStore((state) => state.cart);
  const createOrder = useOrderStore((state) => state.createOrder);
  const resetCheckout= useCheckoutStore((state)=> state.resetCheckout)

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


const handlePlaceOrder = async () => {
  try {
    const res = await createOrder({
      addressId: selectedAddress._id,
      deliveryMethod: selectedDeliveryMethod,
      paymentMethod: selectedPaymentMethod,
    });
    toast.success(res.message);
    //resetCheckout()
    navigate(`/orders/success/${res.data.orderNumber}`,{state: {orderId: res.data.orderId}});
  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={3} />

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-6">
          <ReviewAddressCard
            address={selectedAddress}
            onEdit={() => navigate("/checkout/shipping")}
          />

          <ReviewDeliveryCard selectedDeliveryMethod={selectedDeliveryMethod} onEdit={() => navigate("/checkout/shipping")}/>

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
          onButtonClick={handlePlaceOrder}
        />
      </div>
    </section>
  );
};

export default ReviewPage
