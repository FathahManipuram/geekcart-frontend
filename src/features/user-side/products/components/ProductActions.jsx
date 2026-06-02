// src/features/products/components/ProductActions.jsx

import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductActions = ({
  isWishlisted = false,
  loading,
  onAddToCart,
  onWishlist,
  existsInCart,
  isActive,
}) => {

  const navigate= useNavigate()
  return (
    <>
      {isActive ? (
        <div className="flex gap-4 mt-10">
          {existsInCart ? (
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 h-14 rounded-full bg-[#9c6b3f] hover:bg-[#875a33] text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Go to Cart
            </button>
          ) : (
            <button
              onClick={onAddToCart}
              disabled={loading}
              className="flex-1 h-14 rounded-full bg-[#9c6b3f] hover:bg-[#875a33] disabled:opacity-60 text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />

              {loading ? "Adding..." : "Add to Cart"}
            </button>
          )}

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
      ) : (
        <div className="flex gap-4 mt-10">
          <button
            disabled
            className="
      flex-1
      h-14
      rounded-full
      bg-neutral-300
      text-neutral-600
      font-medium
      cursor-not-allowed
      flex
      items-center
      justify-center
      gap-2
    "
          >
            <ShoppingBag className="w-5 h-5" />
            Currently Unavailable
          </button>

          <button
            onClick={onWishlist}
            className="
      w-14
      h-14
      rounded-full
      border
      border-neutral-300
      flex
      items-center
      justify-center
    "
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-black"
              }`}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default ProductActions;
