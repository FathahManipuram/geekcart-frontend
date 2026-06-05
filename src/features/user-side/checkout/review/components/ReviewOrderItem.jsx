const ReviewOrderItem = ({ item }) => {
  const displayPrice = item.salePrice ?? item.price;

  return (
    <div className="flex gap-4 py-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md border"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>

        <p className="text-sm text-muted-foreground mt-1">
          Size: {item.size} | Color: {item.color}
        </p>

        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
      </div>

      <div className="font-semibold text-lg">
        ₹{displayPrice * item.quantity}
      </div>
    </div>
  );
};

export default ReviewOrderItem;
