import Modal from "@/shared/components/Modal";
import { Card } from "@/shared/components/ui/card";
import { BriefcaseBusiness, House, MapPin } from "lucide-react";
import React, { useState } from "react";
import AddressForm from "./AddressForm";
import { useAccountStore } from "../../store/account.store";
import { toast } from "sonner";
import ConfirmModal from "@/shared/components/ConfirmModal";
import { formatTitleCase } from "@/shared/utils/formatTitleCase";

const AddressCard = ({ address }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const removeAddress = useAccountStore((state) => state.removeAddress);
  const loading = useAccountStore((state) => state.loading);

  const handleDelete = async () => {
    try {
      await removeAddress(address._id);
      toast.success("Address removed successfully");
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed");
    }
  };

  const isDefault = address?.isDefault;
  return (
    <>
      <Card
        className={`rounded-xl p-5 transition-all ${
          isDefault
            ? "border-2 border-amber-700 bg-white"
            : "border border-gray-200 bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {address?.addressLabel === "Home" ? (
              <House size={16} className="text-amber-700" />
            ) : address?.addressLabel === "Work" ? (
              <BriefcaseBusiness size={16} />
            ) : (
              <MapPin size={16} className="text-gray-600" />
            )}

            <h3 className="text-md font-semibold capitalize">
              {address?.addressLabel}
            </h3>
          </div>

          {isDefault && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              DEFAULT
            </span>
          )}
        </div>

        {/* Details */}

        <div className="mt-3 space-y-1 text-sm leading-relaxed text-gray-700">
          {" "}
          <p>{formatTitleCase(address?.fullName)}</p>
          <p>{formatTitleCase(address?.addressLine)}</p>
          <p>{address?.phoneNumber}</p>
          <p>{formatTitleCase(address?.landmark)}</p>
          <p>
            {formatTitleCase(address?.city)}, {formatTitleCase(address?.state)}
          </p>
          <p>
            {formatTitleCase(address?.country)} - {address?.pincode}
          </p>
        </div>

        {/* Actions */}

        <div className="mt-4 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setEditModalOpen(true)}
            className="cursor-pointer text-amber-700 hover:underline"
          >
            EDIT
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModalOpen(true);
            }}
            className="cursor-pointer text-gray-600 hover:underline"
          >
            REMOVE
          </button>
        </div>
      </Card>

      <Modal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        title="Edit Address"
      >
        <AddressForm
          initialData={address}
          onClose={() => setEditModalOpen(false)}
        />
      </Modal>

      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Remove Address"
        description="Are you sure you want to remove this address?"
        confirmText="Remove"
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};

export default AddressCard;
