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
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>

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
              <span className="text-[10px] text-muted-foreground mt-0.5">
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

        <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
          <span>Original Total</span>
          <span>₹{formatCurrency(originalGrandTotal)}</span>
        </div>

        {totalRefundedOut > 0 && (
          <div className="border-t border-dashed pt-2.5 mt-2 space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-lg border">
            <div className="flex justify-between text-red-600 font-medium">
              <span>Processed Wallet Refunds</span>
              <span>-₹{formatCurrency(totalRefundedOut)}</span>
            </div>

            <div className="border-t pt-1.5 flex justify-between font-bold text-base text-green-700">
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
