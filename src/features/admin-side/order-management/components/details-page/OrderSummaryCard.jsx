const OrderSummaryCard = ({ order }) => {
  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-semibold mb-4">Order Summary</h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>₹{order?.subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charge</span>

          <span>₹{order?.deliveryCharge}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span>-₹{order?.discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>

          <span>₹{order?.tax}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>

          <span>₹{order?.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
