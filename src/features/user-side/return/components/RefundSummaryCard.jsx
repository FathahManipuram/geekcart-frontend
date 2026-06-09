const RefundSummaryCard = ({ items = [], selectedItems = [] }) => {
  const selectedProducts = items.filter((item) =>
    selectedItems.includes(item._id),
  );

  const refundAmount = selectedProducts.reduce(
    (total, item) => total + (item.salePrice ?? item.price) * item.quantity,
    0,
  );

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold text-lg mb-6">Refund Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Selected Items</span>

          <span>{selectedProducts.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Refund Method</span>

          <span>Original Payment Method</span>
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold text-lg">
          <span>Estimated Refund</span>

          <span>₹{refundAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RefundSummaryCard;
