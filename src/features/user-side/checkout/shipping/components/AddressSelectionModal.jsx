import AddressForm from "@/features/user-side/account/address/components/AddressForm";
import Modal from "@/shared/components/Modal";
import { Pencil, MapPinPlus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";

const AddressSelectionModal = ({
  addresses = [],
  selectedAddressId,
  onSelect,
}) => {
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  if (!addresses || addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/30 px-4 py-8 text-center dark:border-zinc-800 dark:bg-zinc-900/10">
        <div className="text-muted-foreground mb-3 rounded-full bg-gray-100 p-3 dark:bg-zinc-800">
          <MapPinPlus className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">
          No Addresses Found
        </h3>
        <p className="mt-1 mb-4 max-w-65 text-xs text-gray-500">
          You haven't add any delivery options yet. Add your first address to
          proceed.
        </p>
        <Button
          type="button"
          onClick={() => setIsAddingNew(true)}
          className="cursor-pointer text-xs font-medium"
        >
          Add New Address
        </Button>

        {isAddingNew && (
          <Modal
            open={isAddingNew}
            onOpenChange={setIsAddingNew}
            title="Add New Address"
          >
            <AddressForm
              initialData={null}
              onClose={() => setIsAddingNew(false)}
            />
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <label
          key={address._id}
          className={`flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all ${
            selectedAddressId === address._id
              ? "border-primary bg-gray-50/50"
              : "border-gray-200 hover:border-gray-300"
          } `}
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
              <p className="mt-1 text-sm text-gray-500">
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
              setEditingAddress(address);
            }}
            className="hover:text-primary hover:border-primary cursor-pointer rounded-md border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600 transition-all"
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
