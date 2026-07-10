import { useCartStore } from "@/features/user-side/cart/store/cart.store";
import ReviewOrderItem from "./ReviewOrderItem";

const ReviewOrderItems = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className="bg-card rounded-xl border p-5">
      <h2 className="mb-4 text-lg font-semibold">
        Order Items ({cart?.items?.length})
      </h2>

      <div>
        {cart?.items?.map((item) => (
          <ReviewOrderItem
            key={`${item?.productId._id}-${item?.variantId._id}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewOrderItems;
