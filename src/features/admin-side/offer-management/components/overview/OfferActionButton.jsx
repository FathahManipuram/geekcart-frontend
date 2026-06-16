import { Button } from "@/shared/components/ui/button";
import { Pencil, Power, PowerOff, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/shared/components/ConfirmModal";
import { useOfferStore } from "../../store/offer.store";


const OfferActionButton = ({offer}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);

 const loading = useOfferStore((state) => state.loading);
  const toggleOfferStatus = useOfferStore((state) => state.toggleOfferStatus);
  const deleteOffer = useOfferStore((state) => state.deleteOffer);

  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          setOpenStatusModal(true);
        }}
        className={`${
          offer?.isActive
            ? "border-green-200 bg-green-50 text-green-600"
            : "border-red-200 bg-red-50 text-red-600"
        }`}
      >
        {offer?.isActive ? <Power size={15} /> : <PowerOff size={15} />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          navigate(`/admin/offers/${offer._id}/update`);
        }}
      >
        <Pencil size={15} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpenDeleteModal(true)}
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 size={15} />
      </Button>

      <ConfirmModal
        title="Do you want to delete this offer"
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={()=> deleteOffer(offer?._id)}
        loading={loading}
      />

      <ConfirmModal
        title={
          offer?.isActive ? "Deactivate this offer" : "Activate this offer"
        }
        description=""
        open={openStatusModal}
        onOpenChange={setOpenStatusModal}
        onConfirm={() => toggleOfferStatus(offer?._id)}
        loading={loading}
      />
    </div>
  );
};

export default OfferActionButton;
