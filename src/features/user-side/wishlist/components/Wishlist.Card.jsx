import ConfirmModal from "@/shared/components/ConfirmModal";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../cart/store/cart.store";

const WishlistCard = ({ item, onRemove, onMoveToCart }) => {
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const isInCart = useCartStore((state) => state.isInCart);

  const isUnavailable = !item.productId?.isActive || !item.variantId?.isActive;

  const isOutOfStock = item.variantId?.stock === 0;

  const existInCart = isInCart(item.variantId?._id);

  const discountPercentage = item.variantId?.salePrice
    ? Math.round(
        ((item.variantId?.price - item.variantId?.salePrice) /
          item.variantId?.price) *
          100,
      )
    : 0;

  return (
    <>
      <div className="flex flex-col rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={item.variantId?.images?.[0]}
            alt={item.productId?.name}
            onClick={() =>
              navigate(
                `/products/${item.productId.slug}?variant=${item.variantId._id}`,
              )
            }
            className="aspect-[3/4] w-full cursor-pointer object-cover transition-transform duration-500 hover:scale-105"
          />

          <button
            onClick={() => setOpenDeleteModal(true)}
            className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow backdrop-blur"
          >
            <Trash2 size={14} className="text-neutral-600 hover:text-red-500" />
          </button>

          {/* STATUS */}
          {isUnavailable && (
            <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
              Unavailable
            </span>
          )}

          {!isUnavailable && isOutOfStock && (
            <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="mt-4">
          {/* Top Row */}
          <div className="mx-4 flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900">
              {item.productId?.name}
            </h3>

            <span className="shrink-0 text-xs text-neutral-500">
              {item.variantId?.color} • {item.variantId?.size}
            </span>
          </div>

          {/* Price */}

          <div className="mx-4 mt-1 flex items-center gap-2">
            <p className="text-sm font-semibold text-amber-700 md:text-base">
              ₹{item.variantId?.salePrice || item.variantId?.price}
            </p>

            {item.variantId?.salePrice < item.variantId?.price && (
              <>
                <span className="text-xs text-neutral-400 line-through md:text-sm">
                  ₹{item.variantId?.price}
                </span>

                <span className="text-xs font-medium text-green-600">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {/* Button */}
          <button
            disabled={isUnavailable || isOutOfStock}
            onClick={() =>
              existInCart ? navigate("/cart") : onMoveToCart(item.variantId._id)
            }
            className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isUnavailable || isOutOfStock
                ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                : "bg-[#9B6C43] text-white hover:bg-[#865a35]"
            }`}
          >
            <ShoppingBag size={16} />

            {isUnavailable
              ? "Unavailable"
              : isOutOfStock
                ? "Out of Stock"
                : existInCart
                  ? "Go to Cart"
                  : "Move To Cart"}
          </button>
        </div>
      </div>

      <ConfirmModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        title="Remove Product"
        description="Are you sure you want to remove this item from your wishlist?"
        confirmText="Remove"
        onConfirm={() => onRemove(item.variantId._id)}
      />
    </>
  );
};

export default WishlistCard;
