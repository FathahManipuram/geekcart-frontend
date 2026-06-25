import { formatCurrency } from "@/shared/utils/formatCurrency";

const OrderSummaryCard = ({ order={} }) => {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold text-lg mb-5">Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{formatCurrency(order?.subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery charge</span>
          <span>₹{formatCurrency(order?.deliveryCharge)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{formatCurrency(order?.discount)}</span>
        </div>
        {order?.coupon?.discountAmount && (
            <div className="flex justify-between">
              <span>
                Coupon Discount <span className="text-xs text-muted-foreground">({order?.coupon?.code})</span>
              </span>
              <span>
                -₹{formatCurrency(order?.coupon?.discountAmount) || 0}
              </span>
            </div>

        )}

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{formatCurrency(order?.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
