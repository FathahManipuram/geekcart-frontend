import { formatCurrency } from "@/shared/utils/formatCurrency";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../cart/store/cart.store";

const ProductCard = ({
  product,
  isWishlisted = false,
  onWishlist,
  productId,
  variantId,
}) => {
  const firstVariant = product?.variants?.[0];
  const image = firstVariant?.images?.[0] || product?.coverImage;
  const price = firstVariant?.salePrice || firstVariant?.price;

  const isInCart= useCartStore((state)=> state.isInCart)
  const isExistInCart= isInCart(firstVariant?._id)
console.log("CollectionVarint", firstVariant)
const discountPercentage =
  firstVariant?.salePrice && firstVariant?.price
    ? Math.round(
        ((firstVariant.price - firstVariant.salePrice) / firstVariant.price) *
          100,
      )
    : 0;

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={image}
          alt={product.name}
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* WISHLIST */}
        {!isExistInCart && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onWishlist?.(productId, variantId);
            }}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 backdrop-blur"
          >
            <Heart
              size={18}
              className={`cursor-pointer ${isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-700"}`}
            />
          </button>
        )}
      </div>

      <div className="mt-4">
        <h3 className="line-clamp-1 text-sm font-semibold md:text-base">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-neutral-500 md:text-sm">
          {product?.subcategory?.name}
        </p>

        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#9B6C43]">
            ₹{formatCurrency(price)}
          </span>

          {firstVariant?.price > firstVariant?.salePrice && (
            <>
              <span className="text-sm text-neutral-400 line-through">
                ₹{formatCurrency(firstVariant?.price)}
              </span>

              <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                {discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
