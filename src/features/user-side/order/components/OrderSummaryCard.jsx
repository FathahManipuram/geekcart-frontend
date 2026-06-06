const OrderSummaryCard = ({ order }) => {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold text-lg mb-5">Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{order.shippingCharge}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{order.discount}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
