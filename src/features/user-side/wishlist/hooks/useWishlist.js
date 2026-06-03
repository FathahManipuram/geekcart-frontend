import { toast } from "sonner";
import { useWishlistStore } from "../store/store.wishlist";

export const useWishlist = () => {
  const wishlist = useWishlistStore((state) => state.wishlist);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isWishlisted = useWishlistStore((state) => state.isWishlisted);

  const handleWishlist = async (productId, variantId) => {
    try {
      const exists = isWishlisted(variantId);

      await toggleWishlist({
        productId,
        variantId,
      });

      toast.success(exists ? "Removed from wishlist" : "Added to wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Wishlist action failed");
    }
  };

  return {
    wishlist,
    isWishlisted,
    handleWishlist,
  };
};
