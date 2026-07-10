import Modal from "@/shared/components/Modal";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddressForm from "../../../account/address/components/AddressForm";

const AddNewAddress = () => {
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  return (
    <>
      <button className="group flex w-full items-center gap-4 text-left">
        <div
          onClick={() => setAddressModalOpen(true)}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200"
        >
          <Plus className="text-primary h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Add New Address</h3>

          <p className="text-sm text-gray-500">
            Ship to a different location or a new recipient
          </p>
        </div>
      </button>

      <Modal
        open={addressModalOpen}
        onOpenChange={setAddressModalOpen}
        title="Add New Address"
        className="w-full"
      >
        <AddressForm onClose={() => setAddressModalOpen(false)} />
      </Modal>
    </>
  );
};

export default AddNewAddress;
