const ReturnItemsSection = ({
  items = [],
  selectedItems = [],
  onToggleItem,
  onToggleAll,
}) => {
  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Select Items To Return</h2>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={allSelected} onChange={onToggleAll} className="accent-primary"/>

          <span className="text-sm">Select All</span>
        </label>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const checked = selectedItems.includes(item._id);

          return (
            <div key={item._id} className="border rounded-lg p-4 flex gap-4">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleItem(item._id)}
                className="accent-primary cursor-pointer"
              />

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>

                <p className="text-sm text-muted-foreground">
                  Size: {item.size}
                </p>

                <p className="text-sm text-muted-foreground">
                  Color: {item.color}
                </p>

                <p className="font-semibold mt-2">
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

