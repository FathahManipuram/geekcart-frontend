import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { useCheckoutStore } from "../../../store/checkout.store";
import { toast } from "sonner";
import { Ticket } from "lucide-react";

const CouponModal = ({ open, onOpenChange, coupons = [] }) => {
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const applyCoupon = useCheckoutStore((state) => state.applyCoupon);

  const handleApply = async (coupon) => {
    try {
      await applyCoupon(coupon.code);

      toast.success("Coupon applied");

      onOpenChange(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to apply coupon");
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Available Coupons"
      description="Apply a coupon to save more."
    >
      <div className="space-y-4">
        {coupons?.length > 0 ? (
          coupons.map((coupon) => (
            <div key={coupon?._id} className="rounded-xl border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{coupon?.code}</h4>

                  <p className="text-muted-foreground text-sm">
                    {coupon?.description}
                  </p>

                  <p className="mt-2 text-xs text-green-600">
                    Save{" "}
                    {coupon.discountType === "FIXED"
                      ? `₹${coupon?.discountValue}`
                      : `${coupon?.discountValue}%`}{" "}
                    OFF
                  </p>
                </div>

                <Button
                  className="cursor-pointer"
                  size="sm"
                  variant={
                    appliedCoupon?._id === coupon?._id ? "secondary" : "default"
                  }
                  onClick={() => handleApply(coupon)}
                >
                  {appliedCoupon?._id === coupon?._id ? "Applied" : "Apply"}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Ticket />
            </div>

            <h3 className="text-lg font-semibold">No Coupons Available</h3>

            <p className="text-muted-foreground mt-2 max-w-xs text-sm">
              There are currently no active offers for your order. Check back
              later for exciting discounts.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CouponModal;
