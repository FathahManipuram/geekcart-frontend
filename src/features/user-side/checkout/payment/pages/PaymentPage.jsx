import { useNavigate } from "react-router-dom";
import CheckoutStepper from "../../components/CheckoutStepper";
import PaymentMethodCard from "../components/PaymentMethodCard";
import OrderSummary from "../../components/OrderSummary";
import { useCheckoutStore } from "../../store/checkout.store";
import { useCartStore } from "@/features/user-side/cart/store/cart.store";
import { CHECKOUT_STEPS } from "../../constants/checkoutSteps";
import { PAYMENT_METHODS } from "../../constants/paymentMethods";
import { useEffect } from "react";
import { toast } from "sonner";
import CheckoutItemsPreview from "../../components/CheckoutItemsPreview";



const PaymentPage = () => {
  const navigate = useNavigate();

  const selectedPaymentMethod = useCheckoutStore((state) => state.selectedPaymentMethod);
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
  const selectedAddress= useCheckoutStore((state)=> state.selectedAddress)
  const validatePayment= useCheckoutStore((state)=> state.validatePayment)

  const cart = useCartStore((state) => state.cart);

useEffect(()=>{
  if(!selectedAddress){
    navigate("/checkout/shipping", {replace: true});  
  }
}, [selectedAddress, navigate])


const handleContinue= async()=>{

   if (!selectedPaymentMethod) {
     toast.error("Please select a payment method");
     return;
   }
  try{
    const res= await validatePayment({paymentMethod: selectedPaymentMethod})

     if (!res.valid) {
       toast.error(res.issues[0]?.message);
       return;
     }
      navigate("/checkout/review");

  }catch(err){
   toast.error("Unable to validate payment");
  }
}

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={2} />

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        {/* Left */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Payment Method</h1>

          <p className="text-muted-foreground mb-8">
            Select how you would like to complete your purchase.
          </p>

          <div className="space-y-4">
            {PAYMENT_METHODS.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                selected={selectedPaymentMethod === method.id}
                onSelect={setPaymentMethod}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <OrderSummary
          items={cart?.items || []}
          subtotal={cart?.summary?.subtotal || 0}
          shippingCharge={cart?.summary?.shippingCharge || 0}
          discount={cart?.summary?.discount || 0}
          total={cart?.summary?.total || 0}
          buttonText="Review Order"
          onButtonClick={handleContinue}
          children={<CheckoutItemsPreview/>}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
