import React from "react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const PackageDetailsCard = ({ item }) => {

  const productPrice = item?.salePrice ?? item?.price ?? 0;

  const finalPrice = productPrice * (item?.quantity || 1) - (item?.couponDiscount || 0);

  const hasDiscount =
    productPrice < (item?.price ?? 0) || item?.couponDiscount > 0;

  const getStatusBadge = (status) => {
    switch (status) {
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      case "RETURN_COMPLETED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "DELIVERED":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="uppercase text-xs tracking-widest text-muted-foreground font-medium">
          Package Details
        </h3>
        {item?.itemStatus && (
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusBadge(item.itemStatus)}`}
          >
            {item.itemStatus.replace(/_/g, " ")}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <img
          src={item?.image}
          alt={item?.name}
          className="w-24 h-24 object-cover rounded-xl border border-gray-100"
        />

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 leading-tight">
            {item?.name}
          </h4>

          <div className="text-sm text-muted-foreground mt-1.5 space-x-3">
            <span>
              Size:{" "}
              <strong className="text-gray-700 font-medium">
                {item?.size}
              </strong>
            </span>
            <span>•</span>
            <span>
              Color:{" "}
              <strong className="text-gray-700 font-medium">
                {item?.color}
              </strong>
            </span>
            <span>•</span>
            <span>
              Qty:{" "}
              <strong className="text-gray-700 font-medium">
                {item?.quantity}
              </strong>
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-3">

            <span className="font-bold text-gray-900">
              ₹{formatCurrency(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{formatCurrency((item?.price || 0) * (item?.quantity || 1))}
              </span>
            )}
          </div>
        </div>
      </div>

      {item?.refundAmount > 0 && (
        <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex justify-between items-center text-xs">
          <span className="text-muted-foreground">
            Refund Status:{" "}
            <strong className="text-gray-700 font-medium capitalize">
              {item?.refundStatus?.toLowerCase() || "Pending"}
            </strong>
          </span>
          <span className="font-semibold text-red-600">
            Refunded: ₹{formatCurrency(item.refundAmount)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PackageDetailsCard;
