import { formatCurrency } from "@/shared/utils/formatCurrency";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../cart/store/cart.store";

const ProductCard = ({
  image,
  name,
  price,
  salePrice,
  slug,
  isActive,
  isWishlisted = false,
  onWishlist,
  productId,
  variantId,
}) => {
  const navigate = useNavigate();

  const isInCart = useCartStore((state) => state.isInCart);

  const existInCart = isInCart(variantId);

  const discountPercentage = salePrice
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  return (
    <div
      onClick={() => navigate(`/products/${slug}`)}
      className="group relative w-full cursor-pointer"
    >
      {!isActive && (
        <span className="absolute top-2 left-2 z-10 rounded-full bg-black px-2 py-0.5 text-[9px] font-semibold tracking-wider text-white uppercase sm:top-3 sm:left-3 sm:px-3 sm:py-1 sm:text-[10px]">
          Unavailable
        </span>
      )}

      <div className="relative overflow-hidden rounded-xl bg-[#ece7df] sm:rounded-2xl">
        <img
          src={image}
          alt={name}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-90 md:h-90"
        />

        {!existInCart && (
          <button
            type="button"
            className="absolute top-2 right-2 z-20 rounded-full bg-white/90 p-1.5 backdrop-blur-sm sm:top-3 sm:right-3 sm:p-2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onWishlist?.(productId, variantId);
            }}
          >
            <Heart
              className={`h-4 w-4 cursor-pointer transition-colors sm:h-5 sm:w-5 ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-neutral-700 hover:text-red-500"
              }`}
            />
          </button>
        )}
      </div>

      <div className="pt-2 sm:pt-3">
        <h3 className="line-clamp-2 text-xs font-medium text-neutral-900 sm:line-clamp-1 md:text-sm">
          {name}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <p className="text-xs font-semibold text-amber-700 sm:text-sm md:text-base">
            ₹{formatCurrency(salePrice || price)}
          </p>

          {salePrice < price && (
            <>
              <span className="text-[10px] text-neutral-400 line-through sm:text-xs md:text-sm">
                ₹{formatCurrency(price)}
              </span>

              <span className="text-[10px] font-medium text-green-600 sm:text-xs">
                {discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
