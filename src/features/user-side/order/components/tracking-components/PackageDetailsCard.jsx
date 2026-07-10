import React from "react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const PackageDetailsCard = ({ item }) => {
  const productPrice = item?.salePrice ?? item?.price ?? 0;

  const finalPrice =
    productPrice * (item?.quantity || 1) - (item?.couponDiscount || 0);

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
    <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
          Package Details
        </h3>
        {item?.itemStatus && (
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusBadge(item.itemStatus)}`}
          >
            {item.itemStatus.replace(/_/g, " ")}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <img
          src={item?.image}
          alt={item?.name}
          className="h-24 w-24 rounded-xl border border-gray-100 object-cover"
        />

        <div className="flex-1">
          <h4 className="leading-tight font-semibold text-gray-900">
            {item?.name}
          </h4>

          <div className="text-muted-foreground mt-1.5 space-x-3 text-sm">
            <span>
              Size:{" "}
              <strong className="font-medium text-gray-700">
                {item?.size}
              </strong>
            </span>
            <span>•</span>
            <span>
              Color:{" "}
              <strong className="font-medium text-gray-700">
                {item?.color}
              </strong>
            </span>
            <span>•</span>
            <span>
              Qty:{" "}
              <strong className="font-medium text-gray-700">
                {item?.quantity}
              </strong>
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-bold text-gray-900">
              ₹{formatCurrency(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground text-xs line-through">
                ₹{formatCurrency((item?.price || 0) * (item?.quantity || 1))}
              </span>
            )}
          </div>
        </div>
      </div>

      {item?.refundAmount > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs">
          <span className="text-muted-foreground">
            Refund Status:{" "}
            <strong className="font-medium text-gray-700 capitalize">
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
