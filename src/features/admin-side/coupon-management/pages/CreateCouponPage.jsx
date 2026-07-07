import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CouponForm from "../components/form/CouponForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCouponStore } from "../store/coupon.store";
import { couponSchema } from "../validations/coupon.validation";

const CreateCouponPage = () => {
  const navigate = useNavigate();

  const createCoupon= useCouponStore((state)=> state.createCoupon)
 const loading= useCouponStore((state)=> state.loading)

  const handleCreateCoupon = async (data) => {
    try {

     await createCoupon(data);

      toast.success("Coupon created successfully");

      navigate("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create coupon");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 items-start md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create Coupon</h1>

          <p className="text-muted-foreground">
            Create a new coupon for customers.
          </p>
        </div>

        <Button
          onClick={() => navigate(-1)}
          variant="outline"
        >
          <ArrowLeft size={18} />
          Back
        </Button>
      </div>

      <CouponForm onSubmit={handleCreateCoupon} loading={loading} validation={couponSchema}/>
    </div>
  );
};

export default CreateCouponPage;
