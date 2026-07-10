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
      <div className="flex min-h-[120px] flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center dark:border-zinc-700 dark:bg-zinc-900/20">
        <div className="text-muted-foreground mb-3 rounded-full bg-gray-100 p-2.5 dark:bg-zinc-800">
          <MapPinPlus className="h-5 w-5 text-gray-500" />
        </div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-zinc-100">
          No Delivery Address Selected
        </h3>
        <p className="mt-1 mb-4 max-w-70 text-xs text-gray-500">
          Please select a shipping address to view available delivery methods
          and proceed with checkout.
        </p>
        <Button
          variant="default"
          onClick={() => setShowModal(true)}
          className="cursor-pointer px-5 text-xs"
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
    <div className="flex items-start justify-between gap-3 rounded-md border p-4">
      <div>
        <h3 className="text-lg">
          Deliver to:
          <span className="ml-2 font-semibold">{selectedAddress.fullName}</span>
          {selectedAddress.addressLabel && (
            <span className="ml-3 rounded bg-gray-100 px-2 py-1 text-xs dark:bg-zinc-800 dark:text-zinc-300">
              {selectedAddress.addressLabel}
            </span>
          )}
        </h3>

        <p className="mt-2 text-gray-600 dark:text-zinc-400">
          {selectedAddress.addressLine}, {selectedAddress.city},{" "}
          {selectedAddress.state}, {selectedAddress.pincode}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setShowModal(true)}
          className="text-primary hover:bg-accent cursor-pointer rounded-md border px-5 py-2"
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
