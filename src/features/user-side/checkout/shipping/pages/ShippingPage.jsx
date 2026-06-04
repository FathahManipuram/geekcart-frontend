import CheckoutStepper from "../components/CheckoutStepper";
import OrderSummary from "../components/OrderSummary";
import { useEffect} from "react";
import SelectedAddressCard from "../components/SelectedAddressCard";
import { useAccountStore } from "../../../account/store/account.store";
import { useCheckoutStore } from "../../store/checkout.store";
import AddNewAddress from "../components/AddNewAddress";
import DeliveryMethod from "../components/DeliveryMethod";

const ShippingPage = () => {
  const fetchAddresses = useAccountStore((state) => state.fetchAddresses);
  const addresses = useAccountStore((state) => state.addresses);
  const selectedAddress = useCheckoutStore((state) => state.selectedAddress);
  const setSelectedAddress = useCheckoutStore(
    (state) => state.setSelectedAddress,
  );

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

  console.log("default: ", selectedAddress);
  console.log(addresses);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <CheckoutStepper />

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <SelectedAddressCard
            selectedAddress={selectedAddress}
            addresses={addresses}
          />
          <AddNewAddress />
          <DeliveryMethod />
        </div>

        <OrderSummary />
      </div>
    </section>
  );
};

export default ShippingPage;
