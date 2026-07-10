import React from "react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const OrderSummaryCard = ({ order = {} }) => {
  const isCOD = order?.paymentMethod === "COD";

  const originalDeliveryCharge =
    (order?.shippingCharge ?? 0) + (order?.speedCharge ?? 0);

  const summary = order?.currentSummary || {
    subtotal: order?.subtotal || 0,
    discount: order?.discount || 0,
    couponDiscount: order?.coupon?.discountAmount || 0,
    deliveryCharge: originalDeliveryCharge,
    totalAmount: order?.totalAmount || 0,
  };

  const returnedItems =
    order?.items?.filter((item) => item.itemStatus === "RETURN_COMPLETED") ||
    [];
  const activeItems =
    order?.items?.filter(
      (item) => !["CANCELLED", "RETURN_COMPLETED"].includes(item.itemStatus),
    ) || [];

  const hasReturns = returnedItems.length > 0;
  const isFullyCancelled = activeItems.length === 0 && !hasReturns;

  const displayDeliveryCharge = isFullyCancelled ? 0 : originalDeliveryCharge;

  const totalRefunded =
    order?.items
      ?.filter((item) =>
        ["CANCELLED", "RETURN_COMPLETED"].includes(item.itemStatus),
      )
      ?.reduce((sum, item) => sum + (item.refundAmount || 0), 0) || 0;

  let displayTotal = summary.totalAmount;
  if (isFullyCancelled) {
    displayTotal = 0;
  } else if (activeItems.length === 0) {
    displayTotal = isCOD
      ? originalDeliveryCharge
      : Math.max(0, order.totalAmount - totalRefunded);
  }

  return (
    <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-semibold">Summary</h2>
      </div>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{formatCurrency(summary.subtotal)}</span>
        </div>

        {/* Delivery Charge */}
        <div className="flex justify-between">
          <span>Delivery charge</span>
          <span>
            {displayDeliveryCharge > 0
              ? `₹${formatCurrency(displayDeliveryCharge)}`
              : "₹0"}
          </span>
        </div>

        {/* Product Offers Discount */}
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-600">
            -₹{formatCurrency(summary.discount)}
          </span>
        </div>

        {/* Coupon Discount */}
        {order?.coupon?.discountAmount > 0 && (
          <div className="flex justify-between">
            <span>
              Coupon Discount{" "}
              <span className="text-muted-foreground text-xs">
                ({order?.coupon?.code})
              </span>
            </span>
            <span className="text-green-600">
              {summary.couponDiscount > 0
                ? `-₹${formatCurrency(summary.couponDiscount)}`
                : "₹0 (Revoked)"}
            </span>
          </div>
        )}

        {!isCOD &&
          order?.coupon?.discountAmount > 0 &&
          summary.couponDiscount === 0 &&
          activeItems.length > 0 && (
            <div className="rounded-md border border-amber-100 bg-amber-50 p-2 text-[11px] leading-tight text-amber-700">
              * Coupon was revoked because remaining active items fell below the
              minimum order requirement.
            </div>
          )}

        <hr className="border-gray-100" />

        {/* Total Final / Payable Value Row */}
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>{isCOD ? "Amount to Pay on Delivery" : "Total Paid"}</span>
          <span>₹{formatCurrency(displayTotal)}</span>
        </div>
      </div>

      {totalRefunded > 0 && (
        <div className="flex justify-between rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-700">
          <span>Total Amount Refunded</span>
          <span>₹{formatCurrency(totalRefunded)}</span>
        </div>
      )}

      {/* COD Cancelled/Returned Info */}
      {isCOD && isFullyCancelled && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center text-xs font-medium text-gray-500">
          This COD order has been completely cancelled. No payment is required.
        </div>
      )}
    </div>
  );
};

export default OrderSummaryCard;
