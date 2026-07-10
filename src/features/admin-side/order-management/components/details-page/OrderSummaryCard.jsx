import { formatCurrency } from "@/shared/utils/formatCurrency";

const OrderSummaryCard = ({ order }) => {
  const subtotal = order?.subtotal ?? 0;
  const deliveryCharge = order?.deliveryCharge ?? 0;
  const productDiscount = order?.discount ?? 0;
  const couponDiscount = order?.coupon?.discountAmount ?? 0;
  const tax = order?.tax ?? 0;
  const originalGrandTotal = order?.totalAmount ?? 0;

  const totalRefundedOut = (order?.items || []).reduce(
    (sum, item) => sum + (item.refundAmount ?? 0),
    0,
  );

  const netSettledTotal = Math.max(0, originalGrandTotal - totalRefundedOut);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-900">Financial Summary</h3>

      <div className="space-y-2.5 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{formatCurrency(subtotal)}
          </span>
        </div>

        {productDiscount > 0 && (
          <div className="flex justify-between text-red-600">
            <span>Product Discount</span>
            <span>-₹{formatCurrency(productDiscount)}</span>
          </div>
        )}

        {couponDiscount > 0 && (
          <div className="flex flex-col">
            <div className="flex justify-between text-red-600">
              <span>Coupon Discount</span>
              <span>-₹{formatCurrency(couponDiscount)}</span>
            </div>
            {order?.coupon?.code && (
              <span className="text-muted-foreground mt-0.5 text-[10px]">
                Applied Code: {order.coupon.code}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <span>Delivery Charge</span>
          <span className="font-medium text-gray-900">
            ₹{formatCurrency(deliveryCharge)}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-medium text-gray-900">
              ₹{formatCurrency(tax)}
            </span>
          </div>
        )}

        <div className="flex justify-between border-t pt-3 font-semibold text-gray-900">
          <span>Original Total</span>
          <span>₹{formatCurrency(originalGrandTotal)}</span>
        </div>

        {totalRefundedOut > 0 && (
          <div className="mt-2 space-y-1.5 rounded-lg border border-t border-dashed bg-slate-50 p-2.5 pt-2.5 text-xs">
            <div className="flex justify-between font-medium text-red-600">
              <span>Processed Wallet Refunds</span>
              <span>-₹{formatCurrency(totalRefundedOut)}</span>
            </div>

            <div className="flex justify-between border-t pt-1.5 text-base font-bold text-green-700">
              <span>Net Amount</span>
              <span>₹{formatCurrency(netSettledTotal)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryCard;
