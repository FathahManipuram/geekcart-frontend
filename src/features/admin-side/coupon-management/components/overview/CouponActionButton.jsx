import { Button } from "@/shared/components/ui/button";
import { Pencil, Power, PowerOff, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/shared/components/ConfirmModal";
import { useCouponStore } from "../../store/coupon.store";

const CouponActionButton = ({ coupon }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  const loading = useCouponStore((state) => state.loading);
  const toggleStatusUpdate = useCouponStore(
    (state) => state.toggleStatusUpdate,
  );
  const deleteCoupon = useCouponStore((state) => state.deleteCoupon);

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
          coupon?.isActive
            ? "border-green-200 bg-green-50 text-green-600"
            : "border-red-200 bg-red-50 text-red-600"
        }`}
      >
        {coupon?.isActive ? <Power size={15} /> : <PowerOff size={15} />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          navigate(`/admin/coupons/${coupon._id}/update`);
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
        title="Do you want to delete this coupon"
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={() => deleteCoupon(coupon._id)}
        loading={loading}
      />

      <ConfirmModal
        title={
          coupon?.isActive ? "Deactivate this coupon" : "Activate this coupon"
        }
        description=""
        open={openStatusModal}
        onOpenChange={setOpenStatusModal}
        onConfirm={() => toggleStatusUpdate(coupon._id)}
        loading={loading}
      />
    </div>
  );
};

export default CouponActionButton;
