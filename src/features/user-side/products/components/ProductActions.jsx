import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";

import { useNavigate } from "react-router-dom";

const ProductActions = ({
  isWishlisted = false,
  onWishlist,
  loading,
  onAddToCart,
  existsInCart,
  isUnavailable,
  isOutOfStock,
}) => {
  const navigate = useNavigate();

  const addToCartDisabled = loading || isUnavailable || isOutOfStock;

  return (
    <div className="mt-10 flex gap-4">
      {/* CART BUTTON */}
      {existsInCart && !isUnavailable ? (
        <button
          onClick={() => navigate("/cart")}
          className="
            flex-1
            h-14
            rounded-full
            bg-[#9c6b3f]
            text-white
            font-medium
            flex
            items-center
            justify-center
            gap-2
            hover:bg-[#875a33]
            transition-colors
          "
        >
          <ShoppingCart className="w-5 h-5" />
          Go to Cart
        </button>
      ) : (
        <button
          onClick={onAddToCart}
          disabled={addToCartDisabled}
          className={`
            flex-1
            h-14
            rounded-full
            font-medium
            flex
            items-center
            justify-center
            gap-2
            transition-colors

            ${
              addToCartDisabled
                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                : "bg-[#9c6b3f] text-white hover:bg-[#875a33]"
            }
          `}
        >
          <ShoppingBag className="w-5 h-5" />

          {isUnavailable
            ? "Unavailable"
            : isOutOfStock
              ? "Out of Stock"
              : loading
                ? "Adding..."
                : "Add to Cart"}
        </button>
      )}

      {/* WISHLIST BUTTON */}
      <button
        disabled={isUnavailable}
        onClick={onWishlist}
        className={`
          w-14
          h-14
          rounded-full
          border
          flex
          items-center
          justify-center
          transition-colors

          ${
            isUnavailable
              ? "cursor-not-allowed opacity-50 border-neutral-200"
              : "border-neutral-300 hover:border-black"
          }
        `}
      >
        <Heart
          className={`
            w-5
            h-5
            transition-colors

            ${isWishlisted ? "fill-red-500 text-red-500" : "text-black"}
          `}
        />
      </button>
    </div>
  );
};

export default ProductActions;
