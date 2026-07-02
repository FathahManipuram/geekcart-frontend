import { useState } from "react";
import AddressSelectionModal from "./AddressSelectionModal";
import Modal from "@/shared/components/Modal";
import { useCheckoutStore } from "../../store/checkout.store";
import { Button } from "@/shared/components/ui/button";

const SelectedAddressCard = ({ selectedAddress, addresses }) => {
  const [showModal, setShowModal] = useState(false);
  const setSelectedAddress = useCheckoutStore(
    (state) => state.setSelectedAddress,
  );

  return (
    <div className="border rounded-md p-4 flex justify-between items-start gap-3">
      <div>
        <h3 className="text-lg">
          Deliver to:
          <span className="font-semibold ml-2">
            {selectedAddress?.fullName}
          </span>
          {selectedAddress?.addressLabel && (
            <span className="ml-3 text-xs bg-gray-100 px-2 py-1 rounded">
              {selectedAddress?.addressLabel}
            </span>
          )}
        </h3>

        <p className="text-gray-600 mt-2">
          {selectedAddress?.addressLine}, {selectedAddress?.city},{" "}
          {selectedAddress?.state}, {selectedAddress?.pincode}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setShowModal(true)}
          className="border px-5 py-2 rounded-md text-primary hover:bg-accent"
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
          selectedAddressId={selectedAddress?._id}
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
