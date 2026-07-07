import { useState } from "react";
import AddressSelectionModal from "./AddressSelectionModal";
import Modal from "@/shared/components/Modal";
import { useCheckoutStore } from "../../store/checkout.store";
import { Button } from "@/shared/components/ui/button";
import { MapPinPlus } from "lucide-react"; 

const SelectedAddressCard = ({ selectedAddress, addresses }) => {
  const [showModal, setShowModal] = useState(false);
  const setSelectedAddress = useCheckoutStore(
    (state) => state.setSelectedAddress,
  );


  if (!selectedAddress) {
    return (
      <div className="border border-dashed border-gray-300 dark:border-zinc-700 rounded-md p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-zinc-900/20 min-h-[120px]">
        <div className="bg-gray-100 dark:bg-zinc-800 p-2.5 rounded-full mb-3 text-muted-foreground">
          <MapPinPlus className="w-5 h-5 text-gray-500" />
        </div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-zinc-100">
          No Delivery Address Selected
        </h3>
        <p className="text-xs text-gray-500 max-w-70 mt-1 mb-4">
          Please select a shipping address to view available delivery methods
          and proceed with checkout.
        </p>
        <Button
          variant="default"
          onClick={() => setShowModal(true)}
          className="px-5 cursor-pointer text-xs"
        >
          Select an Address
        </Button>

        <Modal
          open={showModal}
          onOpenChange={setShowModal}
          title="Select Address"
        >
          <AddressSelectionModal
            addresses={addresses}
            selectedAddressId={null}
            onSelect={(address) => {
              setSelectedAddress(address);
              setShowModal(false);
            }}
          />
        </Modal>
      </div>
    );
  }


  return (
    <div className="border rounded-md p-4 flex justify-between items-start gap-3">
      <div>
        <h3 className="text-lg">
          Deliver to:
          <span className="font-semibold ml-2">{selectedAddress.fullName}</span>
          {selectedAddress.addressLabel && (
            <span className="ml-3 text-xs bg-gray-100 px-2 py-1 rounded dark:bg-zinc-800 dark:text-zinc-300">
              {selectedAddress.addressLabel}
            </span>
          )}
        </h3>

        <p className="text-gray-600 dark:text-zinc-400 mt-2">
          {selectedAddress.addressLine}, {selectedAddress.city},{" "}
          {selectedAddress.state}, {selectedAddress.pincode}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setShowModal(true)}
          className="border px-5 py-2 rounded-md text-primary hover:bg-accent cursor-pointer"
        >
          Change
        </Button>
      </div>

      <Modal
        open={showModal}
        onOpenChange={setShowModal}
        title="Select Address"
      >
        <AddressSelectionModal
          addresses={addresses}
          selectedAddressId={selectedAddress._id}
          onSelect={(address) => {
            setSelectedAddress(address);
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default SelectedAddressCard;
