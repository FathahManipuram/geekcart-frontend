
const CancelOrderPreviewCard = ({ order, item }) => {
  if (item) {
    return (
      <div className="border rounded-lg p-4 flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />

        <div>
          <h3 className="font-medium">{item.name}</h3>

          <p className="text-sm text-muted-foreground">Size: {item.size}</p>

          <p className="text-sm text-muted-foreground">Color: {item.color}</p>

          <p className="font-semibold mt-2">₹{item.salePrice ?? item.price}</p>
        </div>
      </div>
    );
  }

  const totalAmount = order.items.reduce(
    (sum, item) => sum + (item.salePrice || item.price) * item.quantity,
    0,
  );

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Order Summary</h3>

      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>₹{(item.salePrice || item.price) * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
        <span>Total Refund</span>

        <span>₹{totalAmount}</span>
      </div>
    </div>
  );
};

export default CancelOrderPreviewCard;
