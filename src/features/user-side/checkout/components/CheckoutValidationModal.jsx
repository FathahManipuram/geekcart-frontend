const CheckoutValidationModal = ({ issues, onRemoveItem, onClose }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Some items need attention</h2>

        <p className="text-sm text-muted-foreground mt-1">
          Please resolve the following issues before continuing to checkout.
        </p>
      </div>

      <div className="space-y-4 max-h-100 overflow-y-auto">
        {issues.map((issue) => (
          <div key={issue.variantId} className="border rounded-xl p-4">
            <div className="flex gap-4">
              <img
                src={issue.image}
                alt={issue.productName}
                className="w-20 h-20 rounded-md object-cover border"
              />

              <div className="flex-1">
                <h3 className="font-medium">{issue.productName}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {issue.color} / {issue.size}
                </p>

                <p className="text-sm text-red-500 mt-2">{issue.message}</p>

                {issue.availableStock && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Available Stock: {issue.availableStock}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => onRemoveItem(issue.variantId)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t">
        <button
          disabled={issues.length > 0}
          onClick={onClose}
          className={`px-4 py-2 border rounded-lg ${issues.length > 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CheckoutValidationModal;
