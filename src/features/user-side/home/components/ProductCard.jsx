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

  const isInCart= useCartStore((state)=> state.isInCart)

  const existInCart= isInCart(variantId)

const discountPercentage = salePrice
  ? Math.round(((price - salePrice) / price) * 100)
  : 0

  return (
    <div
      onClick={() => navigate(`/products/${slug}`)}
      className="group relative cursor-pointer"
    >
      {!isActive && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          Unavailable
        </span>
      )}

      <div className="relative overflow-hidden rounded-2xl bg-[#ece7df]">
        <img
          src={image}
          alt={name}
          className="h-75 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-90 md:h-90"
        />

        {!existInCart && (
          <button
            type="button"
            className="absolute right-3 top-3 z-20 bg-white p-2 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onWishlist?.(productId, variantId);
            }}
          >
            <Heart
              className={`h-5 w-5 transition-colors cursor-pointer ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-neutral-700 hover:text-red-500"
              }`}
            />
          </button>
        )}
      </div>

      <div className="pt-3">
        <h3 className="text-xs font-medium text-neutral-900 md:text-sm">
          {name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm font-semibold text-amber-700 md:text-base">
            ₹{formatCurrency(salePrice || price)}
          </p>

          {salePrice < price && (
            <>
              <span className="text-xs text-neutral-400 line-through md:text-sm">
                ₹{formatCurrency(price)}
              </span>

              <span className="text-xs font-medium text-green-600">
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
