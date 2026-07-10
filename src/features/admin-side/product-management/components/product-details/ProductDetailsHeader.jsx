import Header from "@/shared/components/Header";
import { Button } from "@/shared/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductDetailsHeader = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <Header title={product.name} />

        <div className="flex gap-2">
          <div
            className={`mt-4 inline-flex rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase ${
              product.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } `}
          >
            {product.isActive ? "ACTIVE" : "INACTIVE"}
          </div>

          {product.isFeatured && (
            <div className="mt-4 inline-flex rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold tracking-wide text-amber-800 uppercase">
              Featured
            </div>
          )}

          {product.isLimited && (
            <div className="mt-4 inline-flex rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase">
              Limited
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full flex-col gap-4 lg:w-55">
        <Button variant="outline" className="h-12" onClick={() => navigate(-1)}>
          Back
        </Button>

        <Button
          onClick={() => navigate(`/admin/products/${product._id}/edit`)}
          className="h-12 gap-2"
        >
          <Pencil size={16} />
          Edit Product
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsHeader;
