const PaymentInfoCard = ({ order }) => {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Payment Information</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Method</span>

          <span className="font-medium">{order.paymentMethod}</span>
        </div>

        <div className="flex justify-between">
          <span>Status</span>

          <span
            className={`font-medium ${
              order.paymentStatus === "PAID"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
