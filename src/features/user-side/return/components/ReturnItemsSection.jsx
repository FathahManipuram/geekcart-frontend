const ReturnItemsSection = ({
  items = [],
  selectedItems = [],
  onToggleItem,
  onToggleAll,
}) => {
  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Select Items To Return</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            className="accent-primary"
          />

          <span className="text-sm">Select All</span>
        </label>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const checked = selectedItems.includes(item._id);

          return (
            <div key={item._id} className="flex gap-4 rounded-lg border p-4">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleItem(item._id)}
                className="accent-primary cursor-pointer"
              />

              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>

                <p className="text-muted-foreground text-sm">
                  Size: {item.size}
                </p>

                <p className="text-muted-foreground text-sm">
                  Color: {item.color}
                </p>

                <p className="mt-2 font-semibold">
                  ₹{item.salePrice ?? item.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReturnItemsSection;
