import Header from "@/shared/components/Header";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductOverviewHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Header title="Product Management" />

      <div className="flex items-center gap-4">
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/admin/products/create")}
        >
          <Plus size={16} />
          Add New Product
        </Button>
      </div>
    </div>
  );
};

export default ProductOverviewHeader;
