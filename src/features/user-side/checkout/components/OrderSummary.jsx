
const OrderSummary = ({
  subtotal,
  shippingCharge,
  discount,
  total,
  buttonText,
  onButtonClick,
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

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={onButtonClick}
        className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:opacity-90"
      >
        {buttonText}
      </button>
    </aside>
  );
};

export default OrderSummary;