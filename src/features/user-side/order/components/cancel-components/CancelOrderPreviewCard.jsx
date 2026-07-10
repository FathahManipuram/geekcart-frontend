import { formatCurrency } from "@/shared/utils/formatCurrency";

const CancelOrderPreviewCard = ({ order, item }) => {
  // Single item cancellation
  if (item) {
    const totalItemPrice = (item.salePrice ?? item.price) * item.quantity;

    const finalRefund = Math.max(
      0,
      totalItemPrice - (item.couponDiscount ?? 0),
    );

    const couponDeductionShare = Math.max(0, totalItemPrice - finalRefund);

    return (
      <div className="space-y-4 rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900">Cancellation Preview</h3>
        <div className="flex gap-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 rounded-md border bg-white object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium text-gray-900">
              {item.name}
            </h4>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Size: {item.size} | Color: {item.color}
            </p>
            <p className="text-muted-foreground text-xs">
              Qty: {item.quantity}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              ₹{formatCurrency(totalItemPrice)}
            </p>
          </div>
        </div>

        <div className="text-muted-foreground space-y-1.5 border-t pt-3 text-xs">
          <div className="flex justify-between">
            <span>Item Price Subtotal</span>
            <span className="font-medium text-gray-900">
              ₹{formatCurrency(totalItemPrice)}
            </span>
          </div>
          {couponDeductionShare > 0 && (
            <div className="flex justify-between font-medium text-red-600">
              <span>Coupon Adjustment Share</span>
              <span>-₹{formatCurrency(couponDeductionShare)}</span>
            </div>
          )}
          <div className="mt-2 flex justify-between border-t border-dashed pt-2 text-sm font-semibold text-emerald-700">
            <span>Estimated Refund to Wallet</span>
            <span>+₹{formatCurrency(finalRefund)}</span>
          </div>
        </div>
      </div>
    );
  }

  //full order cancellation
  const originalSubtotal = order.items.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0,
  );

  const deliveryCharge = (order.shippingCharge ?? 0) + (order.speedCharge ?? 0);
  const estimatedFullRefund = order.totalAmount;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-900">
        Order Cancellation Summary
      </h3>

      <div className="max-h-48 space-y-3 overflow-y-auto pr-1">
        {order.items.map((i) => (
          <div
            key={i._id}
            className="flex justify-between text-xs text-gray-600"
          >
            <span className="flex-1 truncate pr-4 text-gray-700">
              {i.name}{" "}
              <span className="text-muted-foreground font-normal">
                × {i.quantity}
              </span>
            </span>
            <span className="flex-shrink-0 font-medium text-gray-900">
              ₹{formatCurrency((i.salePrice ?? i.price) * i.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="text-muted-foreground mt-4 space-y-2 border-t pt-3 text-xs">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{formatCurrency(originalSubtotal)}
          </span>
        </div>
        {order.coupon?.discountAmount > 0 && (
          <div className="flex justify-between font-medium text-red-600">
            <span>Coupon Discount ({order.coupon.code})</span>
            <span>-₹{formatCurrency(order.coupon.discountAmount)}</span>
          </div>
        )}
        {deliveryCharge > 0 && (
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="font-medium text-gray-900">
              ₹{formatCurrency(deliveryCharge)}
            </span>
          </div>
        )}

        <div className="mt-2 flex justify-between border-t border-dashed pt-2 text-base font-bold text-emerald-700">
          <span>Total Estimated Refund</span>
          <span>₹{formatCurrency(estimatedFullRefund)}</span>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderPreviewCard;
