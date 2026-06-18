import { Button } from "@/shared/components/ui/button";
import { useCheckoutStore } from "../../../store/checkout.store";

const AppliedCouponCard = ({ onOpenModal }) => {
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const couponDiscount= useCheckoutStore((state)=> state.couponDiscount)

  const removeAppliedCoupon = useCheckoutStore(
    (state) => state.removeAppliedCoupon,
  );

  if (!appliedCoupon) {
    return (
      <div className="border rounded-xl p-4 mb-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Offers & Coupons</h3>

            <p className="text-sm text-muted-foreground">
              Apply coupon to save more
            </p>
          </div>

          <Button variant="outline" onClick={onOpenModal}>
            View Coupons
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-4 bg-green-50 mb-5">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-green-700">{appliedCoupon.code}</h3>

          <p className="text-sm">Saved ₹{couponDiscount}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onOpenModal}>
            Change
          </Button>

          <Button variant="destructive" size="sm" onClick={removeAppliedCoupon}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppliedCouponCard;
