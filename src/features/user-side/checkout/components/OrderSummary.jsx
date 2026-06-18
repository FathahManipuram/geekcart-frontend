
const OrderSummary = ({
  subtotal,
  deliveryCharge,
  shippingCharge,
  speedCharge,
  couponDiscount,
  discount,
  total,
  buttonText,
  onButtonClick,
  buttonDisabled,
  children,
}) => {
  return (
    <aside className="bg-gray-50 rounded-2xl p-6 h-fit">
      <h2 className="font-semibold text-xl mb-6">Order Summary</h2>

      {children}

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span
              className={
                deliveryCharge === 0 ? "text-green-600 font-medium" : ""
              }
            >
              {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
            </span>
          </div>

          {deliveryCharge > 0 && (speedCharge > 0 || shippingCharge > 0) && (
            <p className="text-xs text-gray-400 mt-0.5 fallback-font">
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
            <span>Coupon Discount</span>

            <span className="text-green-600">-₹{couponDiscount}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{(total)-(couponDiscount ||0)}</span>
        </div>
      </div>

      <button
        disabled={buttonDisabled}
        onClick={onButtonClick}
        className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:opacity-90"
      >
        {buttonText}
      </button>
    </aside>
  );
};

export default OrderSummary;