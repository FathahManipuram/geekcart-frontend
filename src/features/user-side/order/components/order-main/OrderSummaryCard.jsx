import React from "react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const OrderSummaryCard = ({ order = {} }) => {
  const isCOD = order?.paymentMethod === "COD";

  // 1. Calculate what the original delivery charge was from the database snapshot
  const originalDeliveryCharge =
    (order?.shippingCharge ?? 0) + (order?.speedCharge ?? 0);

  // 2. Fetch the dynamic live current summary values from the backend
  const summary = order?.currentSummary || {
    subtotal: order?.subtotal || 0,
    discount: order?.discount || 0,
    couponDiscount: order?.coupon?.discountAmount || 0,
    deliveryCharge: originalDeliveryCharge,
    totalAmount: order?.totalAmount || 0,
  };

  // 3. Count how many items have been returned vs cancelled
  const returnedItems =
    order?.items?.filter((item) => item.itemStatus === "RETURN_COMPLETED") ||
    [];
  const activeItems =
    order?.items?.filter(
      (item) => !["CANCELLED", "RETURN_COMPLETED"].includes(item.itemStatus),
    ) || [];

  const hasReturns = returnedItems.length > 0;
  const isFullyCancelled = activeItems.length === 0 && !hasReturns;

  // 4. Delivery charge display rule
  const displayDeliveryCharge = isFullyCancelled ? 0 : originalDeliveryCharge;

  // 5. Calculate total historical money refunded to the user so far
  const totalRefunded =
    order?.items
      ?.filter((item) =>
        ["CANCELLED", "RETURN_COMPLETED"].includes(item.itemStatus),
      )
      ?.reduce((sum, item) => sum + (item.refundAmount || 0), 0) || 0;

  // 6. Compute True Total dynamically based on payment type
  let displayTotal = summary.totalAmount;
  if (isFullyCancelled) {
    displayTotal = 0;
  } else if (activeItems.length === 0) {
    // This handles the scenario where all items are returned (Delivery charge is kept by store)
    displayTotal = isCOD
      ? originalDeliveryCharge
      : Math.max(0, order.totalAmount - totalRefunded);
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-semibold text-lg">Summary</h2>
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
              <span className="text-xs text-muted-foreground">
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

        {/* ✅ FIXED COUPON REVOCATION ALERT BANNER */}
        {/* Only show this warning if there are items REMAINING on the order that lost the promotion */}
        {!isCOD &&
          order?.coupon?.discountAmount > 0 &&
          summary.couponDiscount === 0 &&
          activeItems.length > 0 && (
            <div className="text-[11px] bg-amber-50 text-amber-700 p-2 rounded-md leading-tight border border-amber-100">
              * Coupon was revoked because remaining active items fell below the
              minimum order requirement.
            </div>
          )}

        <hr className="border-gray-100" />

        {/* Total Final / Payable Value Row */}
        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>{isCOD ? "Amount to Pay on Delivery" : "Total Paid"}</span>
          <span>₹{formatCurrency(displayTotal)}</span>
        </div>
      </div>

      {/* Refund Footer Badge */}
      {totalRefunded > 0 && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl flex justify-between text-xs font-medium border border-red-100">
          <span>Total Amount Refunded</span>
          <span>₹{formatCurrency(totalRefunded)}</span>
        </div>
      )}

      {/* COD Specific Cancelled/Returned Info Banner */}
      {isCOD && isFullyCancelled && (
        <div className="bg-gray-50 text-gray-500 p-3 rounded-xl text-center text-xs border border-gray-200 font-medium">
          This COD order has been completely cancelled. No payment is required.
        </div>
      )}
    </div>
  );
};

export default OrderSummaryCard;
