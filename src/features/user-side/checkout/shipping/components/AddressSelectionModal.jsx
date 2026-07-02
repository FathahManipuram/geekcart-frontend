import AddressForm from "@/features/user-side/account/address/components/AddressForm";
import Modal from "@/shared/components/Modal";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

const AddressSelectionModal = ({ addresses, selectedAddressId, onSelect }) => {
  const [editingAddress, setEditingAddress] = useState(null);

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <label
          key={address._id}
          className={`
            flex items-start justify-between border rounded-xl p-4 cursor-pointer transition-all
            ${
              selectedAddressId === address._id
                ? "border-primary bg-gray-50/50"
                : "border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <div className="flex gap-4">
            <input
              type="radio"
              checked={selectedAddressId === address._id}
              onChange={() => onSelect(address)}
              className="accent-primary mt-1 h-4 w-4"
            />

            <div>
              <h3 className="font-medium text-gray-900">{address.fullName}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {address.addressLine}
              </p>
              <p className="text-sm text-gray-500">
                {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditingAddress(address); // ✅ Sets target address to trigger modal opening
            }}
            className="text-xs font-semibold text-gray-600 hover:text-primary border border-gray-200 hover:border-primary rounded-md px-2.5 py-1 transition-all"
          >
            <Pencil size={16} />
          </button>
        </label>
      ))}

      {!!editingAddress && (
        <Modal
          open={!!editingAddress}
          onOpenChange={(isOpen) => !isOpen && setEditingAddress(null)}
          title="Edit Address"
        >
          <AddressForm
            initialData={editingAddress}
            onClose={() => setEditingAddress(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default AddressSelectionModal;
