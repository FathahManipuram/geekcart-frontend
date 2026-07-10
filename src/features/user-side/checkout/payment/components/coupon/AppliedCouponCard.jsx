import { Button } from "@/shared/components/ui/button";
import { useCheckoutStore } from "../../../store/checkout.store";

const AppliedCouponCard = ({ onOpenModal }) => {
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const couponDiscount = useCheckoutStore((state) => state.couponDiscount);

  const removeAppliedCoupon = useCheckoutStore(
    (state) => state.removeAppliedCoupon,
  );

  if (!appliedCoupon) {
    return (
      <div className="mb-5 rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Offers & Coupons</h3>

            <p className="text-muted-foreground text-sm">
              Apply coupon to save more
            </p>
          </div>

          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={onOpenModal}
          >
            View Coupons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 rounded-xl border bg-green-50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-green-700">{appliedCoupon.code}</h3>

          <p className="text-sm">Saved ₹{couponDiscount}</p>
        </div>

        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={onOpenModal}
          >
            Change
          </Button>

          <Button
            className="cursor-pointer"
            variant="destructive"
            size="sm"
            onClick={removeAppliedCoupon}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppliedCouponCard;
