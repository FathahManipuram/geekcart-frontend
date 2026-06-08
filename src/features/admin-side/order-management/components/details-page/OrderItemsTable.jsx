const OrderItemsTable = ({ items = [] }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Product</th>

            <th className="text-center p-4">Qty</th>

            <th className="text-center p-4">Unit Price</th>

            <th className="text-center p-4">Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.variantId} className="border-b">
              <td className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />

                  <div>
                    <h4 className="font-medium">{item.name}</h4>

                    <p className="text-sm text-muted-foreground">
                      {item.color} /{item.size}
                    </p>
                  </div>
                </div>
              </td>

              <td className="text-center">{item.quantity}</td>

              <td className="text-center">₹{item.price}</td>

              <td className="text-center font-medium">
                ₹{item.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItemsTable;
