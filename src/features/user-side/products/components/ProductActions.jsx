// src/features/products/components/ProductActions.jsx

import { Heart, ShoppingBag } from "lucide-react";

const ProductActions = ({
  isWishlisted = false,
  isLoading = false,
  onAddToCart,
  onWishlist,
}) => {
  return (
    <div className="flex gap-4 mt-10">
      {/* Add To Cart */}
      <button
        onClick={onAddToCart}
        disabled={isLoading}
        className="flex-1 h-14 rounded-full bg-[#9c6b3f] hover:bg-[#875a33] disabled:opacity-60 text-white font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />

        {isLoading ? "Adding..." : "Add to Cart"}
      </button>

      {/* Wishlist */}
      <button
        onClick={onWishlist}
        className="w-14 h-14 rounded-full border border-neutral-300 flex items-center justify-center hover:border-black transition-colors"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-black"
          }`}
        />
      </button>
    </div>
  );
};

export default ProductActions;
