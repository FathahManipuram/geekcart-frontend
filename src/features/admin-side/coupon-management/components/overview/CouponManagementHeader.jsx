import Header from "@/shared/components/Header";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CouponManagementHeader = () => {
   const navigate= useNavigate()
  return (
    <div className="flex items-start flex-col gap-4 md:justify-between md:flex-row">
      <div>
        <Header title="Coupon Management" />

        <p className="text-muted-foreground">
          Create and manage coupons.
        </p>
      </div>

      <Button
        onClick={() => navigate("/admin/coupons/create")}
        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Plus size={18} />
        Create Coupon
      </Button>
    </div>
  );
};

export default CouponManagementHeader;
