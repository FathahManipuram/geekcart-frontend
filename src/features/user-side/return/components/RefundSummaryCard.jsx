const RefundSummaryCard = ({ items = [], selectedItems = [] }) => {
  const selectedProducts = items.filter((item) =>
    selectedItems.includes(item._id),
  );

  const refundAmount = selectedProducts.reduce(
    (total, item) => total + (item.salePrice ?? item.price) * item.quantity,
    0,
  );

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">Refund Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Selected Items</span>

          <span>{selectedProducts.length}</span>
        </div>

        <div className="flex justify-between">
          <span>Refund Method</span>

          <span>Original Payment Method</span>
        </div>

        <div className="flex justify-between border-t pt-4 text-lg font-semibold">
          <span>Estimated Refund</span>

          <span>₹{refundAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RefundSummaryCard;
