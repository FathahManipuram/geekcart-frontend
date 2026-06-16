import Header from "@/shared/components/Header";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OfferManagementHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-start flex-col gap-4 md:justify-between md:flex-row">
      <div>
        <Header title="Offer Management" />

        <p className="text-muted-foreground">
          Manage product and category offers.
        </p>
      </div>

      <Button
        onClick={() => navigate("/admin/offers/create")}
      >
        <Plus size={18} />
        Create Offer
      </Button>
    </div>
  );
};

export default OfferManagementHeader;
