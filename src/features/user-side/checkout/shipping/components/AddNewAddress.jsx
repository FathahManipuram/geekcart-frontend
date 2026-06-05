import Modal from "@/shared/components/Modal";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddressForm from "../../../account/address/components/AddressForm";

const AddNewAddress = () => {
	const [addressModalOpen, setAddressModalOpen]= useState(false)
  return (
    <>
      <button className="flex items-center gap-4 w-full text-left group">
        <div
          onClick={() => setAddressModalOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5 text-primary" />
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
