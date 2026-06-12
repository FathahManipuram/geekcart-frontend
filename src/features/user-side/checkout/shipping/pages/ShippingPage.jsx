import CheckoutStepper from "../../components/CheckoutStepper";
import OrderSummary from "../../components/OrderSummary";
import { useEffect} from "react";
import SelectedAddressCard from "../components/SelectedAddressCard";
import { useAccountStore } from "../../../account/store/account.store";
import { useCheckoutStore } from "../../store/checkout.store";
import AddNewAddress from "../components/AddNewAddress";
import DeliveryMethod from "../components/DeliveryMethod";
import { CHECKOUT_STEPS } from "../../constants/checkoutSteps";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CheckoutItemsPreview from "../../components/CheckoutItemsPreview";
import { useCartStore } from "@/features/user-side/cart/store/cart.store";

const ShippingPage = () => {
  const navigate= useNavigate()
  const fetchAddresses = useAccountStore((state) => state.fetchAddresses);
  const addresses = useAccountStore((state) => state.addresses);
  const summary= useCartStore((state)=> state.summary)
  const selectedAddress = useCheckoutStore((state) => state.selectedAddress);
  const selectedDeliveryMethod= useCheckoutStore((state)=> state.selectedDeliveryMethod)
  const setSelectedAddress = useCheckoutStore(
    (state) => state.setSelectedAddress,
  );
  const validateShipping = useCheckoutStore((state) => state.validateShipping);


  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses.length && !selectedAddress) {
      const defaultAddress =
        addresses.find((address) => address.isDefault) || addresses[0];

      setSelectedAddress(defaultAddress);
    }
  }, [addresses]);

const speedCharge= selectedDeliveryMethod==="EXPRESS"? 25 : 0


  const handleContinue = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if(!selectedDeliveryMethod){
      toast.error("Please select a delivery method");
      return;
    }
    try {
      const result = await validateShipping({
        addressId: selectedAddress._id,
        deliveryMethod: selectedDeliveryMethod,
      });

      if (!result.valid) {
        toast.error(result.issues[0]?.message);
        return;
      }

      navigate("/checkout/payment");
    } catch (error) {
      toast.error("Unable to validate shipping");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={1} />

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <SelectedAddressCard
            selectedAddress={selectedAddress}
            addresses={addresses}
          />
          <AddNewAddress />
          <DeliveryMethod />
        </div>

        <OrderSummary
          subtotal={summary.subtotal}
          deliveryCharge={summary?.deliveryCharge + speedCharge || 0}
          shippingCharge={summary?.deliveryCharge || 0}
          speedCharge={speedCharge}
          discount={summary.discount}
          total={
            speedCharge ? (summary.total + speedCharge) : summary.total
          }
          buttonText="Proceed To Payment"
          onButtonClick={handleContinue}
          children={<CheckoutItemsPreview />}
        />
      </div>
    </section>
  );
};

export default ShippingPage;
