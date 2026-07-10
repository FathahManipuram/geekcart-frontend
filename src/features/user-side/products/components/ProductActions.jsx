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
    <div className="mt-10 flex w-full gap-4">
      {existsInCart && !isUnavailable ? (
        <button
          onClick={() => navigate("/cart")}
          className="flex h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#9c6b3f] font-medium text-white transition-colors hover:bg-[#875a33]"
        >
          <ShoppingCart className="h-5 w-5" />
          Go to Cart
        </button>
      ) : (
        <button
          onClick={onAddToCart}
          disabled={addToCartDisabled}
          className={`flex h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-colors ${
            addToCartDisabled
              ? "cursor-not-allowed bg-neutral-300 text-neutral-500"
              : "bg-[#9c6b3f] text-white hover:bg-[#875a33]"
          } `}
        >
          <ShoppingBag className="h-5 w-5" />
          {isUnavailable
            ? "Unavailable"
            : isOutOfStock
              ? "Out of Stock"
              : loading
                ? "Adding..."
                : "Add to Cart"}
        </button>
      )}

      {!existsInCart && (
        <button
          disabled={isUnavailable}
          onClick={onWishlist}
          className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border transition-colors ${
            isUnavailable
              ? "cursor-not-allowed border-neutral-200 opacity-50"
              : "border-neutral-300 hover:border-black"
          } `}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-black"} `}
          />
        </button>
      )}
    </div>
  );
};

export default ProductActions;
