import { formatCurrency } from "@/shared/utils/formatCurrency";

const CancelOrderPreviewCard = ({ order, item,}) => {

// Single item cancellation
  if (item) {
    const totalItemPrice = (item.salePrice ?? item.price) * item.quantity;


    const finalRefund = Math.max(0, totalItemPrice - (item.couponDiscount ?? 0));

   
    const couponDeductionShare = Math.max(0, totalItemPrice - finalRefund);

    return (
      <div className="border rounded-xl p-5 bg-white space-y-4 shadow-sm">
        <h3 className="font-semibold text-gray-900">Cancellation Preview</h3>
        <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md border bg-white"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-gray-900 truncate">
              {item.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Size: {item.size} | Color: {item.color}
            </p>
            <p className="text-xs text-muted-foreground">
              Qty: {item.quantity}
            </p>
            <p className="font-semibold text-sm text-gray-900 mt-1">
              ₹{formatCurrency(totalItemPrice)}
            </p>
          </div>
        </div>

      
        <div className="space-y-1.5 text-xs border-t pt-3 text-muted-foreground">
          <div className="flex justify-between">
            <span>Item Price Subtotal</span>
            <span className="text-gray-900 font-medium">
              ₹{formatCurrency(totalItemPrice)}
            </span>
          </div>
          {couponDeductionShare > 0 && (
            <div className="flex justify-between text-red-600 font-medium">
              <span>Coupon Adjustment Share</span>
              <span>-₹{formatCurrency(couponDeductionShare)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-emerald-700 font-semibold pt-2 border-t border-dashed mt-2">
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

  const deliveryCharge =
    (order.shippingCharge ?? 0) +
    (order.speedCharge ?? 0);
  const estimatedFullRefund = order.totalAmount;

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">
        Order Cancellation Summary
      </h3>

      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
        {order.items.map((i) => (
          <div
            key={i._id}
            className="flex justify-between text-xs text-gray-600"
          >
            <span className="truncate flex-1 pr-4 text-gray-700">
              {i.name}{" "}
              <span className="text-muted-foreground font-normal">
                × {i.quantity}
              </span>
            </span>
            <span className="font-medium text-gray-900 flex-shrink-0">
              ₹{formatCurrency((i.salePrice ?? i.price) * i.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-3 space-y-2 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-gray-900 font-medium">
            ₹{formatCurrency(originalSubtotal)}
          </span>
        </div>
        {order.coupon?.discountAmount > 0 && (
          <div className="flex justify-between text-red-600 font-medium">
            <span>Coupon Discount ({order.coupon.code})</span>
            <span>-₹{formatCurrency(order.coupon.discountAmount)}</span>
          </div>
        )}
        {deliveryCharge > 0 && (
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-gray-900 font-medium">
              ₹{formatCurrency(deliveryCharge)}
            </span>
          </div>
        )}

        <div className="border-t border-dashed mt-2 pt-2 flex justify-between text-base font-bold text-emerald-700">
          <span>Total Estimated Refund</span>
          <span>₹{formatCurrency(estimatedFullRefund)}</span>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderPreviewCard;
