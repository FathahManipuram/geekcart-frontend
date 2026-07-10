import { formatCurrency } from "@/shared/utils/formatCurrency";

const OrderSummary = ({
  subtotal,
  deliveryCharge,
  shippingCharge,
  speedCharge,
  couponDiscount,
  code,
  discount,
  total,
  buttonText,
  onButtonClick,
  buttonDisabled,
  loading,
  children,
}) => {
  return (
    <aside className="h-fit rounded-2xl bg-gray-50 p-6">
      <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

      {children}

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{formatCurrency(subtotal)}</span>
        </div>

        <div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span
              className={
                deliveryCharge === 0 ? "font-medium text-green-600" : ""
              }
            >
              {deliveryCharge === 0
                ? "Free"
                : `₹${formatCurrency(deliveryCharge)}`}
            </span>
          </div>

          {deliveryCharge > 0 && (speedCharge > 0 || shippingCharge > 0) && (
            <p className="fallback-font mt-0.5 text-xs text-gray-400">
              (Includes{" "}
              {shippingCharge > 0
                ? `₹${shippingCharge} standard shipping`
                : "free shipping"}
              {speedCharge > 0 && ` + ₹${speedCharge} express speed`})
            </p>
          )}
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between">
            <span>
              Coupon Discount{" "}
              {code ? (
                <span className="text-muted-foreground text-xs">({code})</span>
              ) : (
                ""
              )}
            </span>

            <span className="text-green-600">
              -₹{formatCurrency(couponDiscount)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{formatCurrency(discount)}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{formatCurrency(total - (couponDiscount || 0))}</span>
        </div>
      </div>

      <button
        disabled={buttonDisabled || loading}
        onClick={onButtonClick}
        className="bg-primary mt-6 w-full cursor-pointer rounded-lg py-3 text-white hover:opacity-90"
      >
        {buttonText}
      </button>
    </aside>
  );
};

export default OrderSummary;
