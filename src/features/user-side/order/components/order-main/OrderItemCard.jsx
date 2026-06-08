const OrderItemCard = ({ item }) => {
  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-lg border"
        />

        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg">{item.name}</h3>

            <p className="font-semibold">
              ₹{(item.salePrice ?? item.price) * item.quantity}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-muted-foreground">
            <div>
              <p>Color</p>
              <p className="font-medium text-black">{item.color}</p>
            </div>

            <div>
              <p>Size</p>
              <p className="font-medium text-black">{item.size}</p>
            </div>

            <div>
              <p>Quantity</p>
              <p className="font-medium text-black">{item.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
