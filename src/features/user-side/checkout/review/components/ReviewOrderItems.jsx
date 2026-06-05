import { useCartStore } from "@/features/user-side/cart/store/cart.store";
import ReviewOrderItem from "./ReviewOrderItem";

const ReviewOrderItems = () => {
    const cart = useCartStore((state) => state.cart);
  return (
    <div className="bg-card border rounded-xl p-5">
      <h2 className="font-semibold text-lg mb-4">
        Order Items ({cart?.items?.length})
      </h2>

      <div>
        {cart?.items?.map((item) => (
          <ReviewOrderItem
            key={`${item?.productId}-${item?.variantId}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewOrderItems;
