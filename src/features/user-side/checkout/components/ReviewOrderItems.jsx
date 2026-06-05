import { useCartStore } from "@/features/user-side/cart/store/cart.store";

const ReviewOrderItems = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-5">
        Order Items ({cart?.items?.length || 0})
      </h2>

      <div className="space-y-5">
        {cart?.items?.map((item) => (
          <div
            key={item.variantId}
            className="flex gap-4 border-b pb-5 last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover border"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>

              <p className="text-sm text-gray-500 mt-1">
                {item.color} / {item.size}
              </p>

              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            <div className="text-right">
              {item.salePrice ? (
                <>
                  <p className="font-semibold">₹{item.salePrice}</p>

                  <p className="text-sm text-gray-400 line-through">
                    ₹{item.price}
                  </p>
                </>
              ) : (
                <p className="font-semibold">₹{item.price}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewOrderItems;
