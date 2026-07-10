import Header from "@/shared/components/Header";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CouponManagementHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
      <div>
        <Header title="Coupon Management" />

        <p className="text-muted-foreground">Create and manage coupons.</p>
      </div>

      <Button
        onClick={() => navigate("/admin/coupons/create")}
        className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white"
      >
        <Plus size={18} />
        Create Coupon
      </Button>
    </div>
  );
};

export default CouponManagementHeader;
