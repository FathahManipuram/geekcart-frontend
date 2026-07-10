const CheckoutValidationModal = ({ issues, onRemoveItem, onClose }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Some items need attention</h2>

        <p className="text-muted-foreground mt-1 text-sm">
          Please resolve the following issues before continuing to checkout.
        </p>
      </div>

      <div className="max-h-100 space-y-4 overflow-y-auto">
        {issues.map((issue) => (
          <div key={issue.variantId} className="rounded-xl border p-4">
            <div className="flex gap-4">
              <img
                src={issue.image}
                alt={issue.productName}
                className="h-20 w-20 rounded-md border object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium">{issue.productName}</h3>

                <p className="text-muted-foreground mt-1 text-sm">
                  {issue.color} / {issue.size}
                </p>

                <p className="mt-2 text-sm text-red-500">{issue.message}</p>

                {issue.availableStock && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    Available Stock: {issue.availableStock}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
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

      <div className="flex justify-end gap-3 border-t pt-2">
        <button
          disabled={issues.length > 0}
          onClick={onClose}
          className={`rounded-lg border px-4 py-2 ${issues.length > 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CheckoutValidationModal;
