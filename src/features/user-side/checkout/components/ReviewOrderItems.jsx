import { useCartStore } from "@/features/user-side/cart/store/cart.store";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const ReviewOrderItems = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-5 text-lg font-semibold">
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
              className="h-24 w-24 rounded-lg border object-cover"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>

              <p className="mt-1 text-sm text-gray-500">
                {item.color} / {item.size}
              </p>

              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹{formatCurrency(item.salePrice ?? item.price)}
              </p>

              {item.salePrice != null && item.salePrice < item.price && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{formatCurrency(item.price)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewOrderItems;
