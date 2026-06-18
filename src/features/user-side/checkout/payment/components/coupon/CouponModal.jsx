import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import { useCheckoutStore } from "../../../store/checkout.store";
import { toast } from "sonner";

const CouponModal = ({ open, onOpenChange, coupons = [] }) => {
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const applyCoupon = useCheckoutStore((state) => state.applyCoupon);

  const handleApply = async(coupon) => {
   try {
    await applyCoupon(
      coupon.code,
    );

    toast.success(
      "Coupon applied",
    );

    onOpenChange(false);
  } catch (error) {
    toast.error(
      error?.response?.data
        ?.message ||
        "Failed to apply coupon",
    );
  }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Offers & Coupons"
      description="Apply a coupon to save more."
    >
      <div className="space-y-4">
        {coupons?.map((coupon) => (
          <div key={coupon?._id} className="border rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{coupon?.code}</h4>

                <p className="text-sm text-muted-foreground">
                  {coupon?.description}
                </p>

                <p className="text-xs text-green-600 mt-2">
                  Save ₹{coupon?.discountValue}
                </p>
              </div>

              <Button
                size="sm"
                variant={
                  appliedCoupon?._id === coupon?._id ? "secondary" : "default"
                }
                onClick={() => handleApply(coupon)}
              >
                {appliedCoupon?._id === coupon._id ? "Applied" : "Apply"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CouponModal;
