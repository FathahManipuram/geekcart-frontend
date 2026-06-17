import { Minus, Plus, X } from "lucide-react";

import { useCartStore } from "../store/cart.store";
import { useNavigate } from "react-router-dom";

const CartItemCard = ({ items }) => {

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

const navigate= useNavigate()

  const handleToProductDetails=(slug, variantId)=>{
    navigate(`/products/${slug}?variant=${variantId}`);
  }

  return (
    <div className="space-y-8">
      {items.map((item) => {
      
       const finalPrice = item.salePrice || item.price;

       const totalPrice = finalPrice * item.quantity;

       const totalOriginalPrice = item.price * item.quantity;

       const savedAmount = totalOriginalPrice - totalPrice;
       
const isProductAvailable =
  item.productId?.isActive && !item.productId?.isDeleted;

const isVariantAvailable =
  item.variantId?.isActive && !item.variantId?.isDeleted;
       const currentStock = item?.variantId?.stock || 0;


      const isOutOfStock = currentStock === 0;

        return (
          <div
            key={item._id || item.variantId?._id || item.variantId}
            className="border-b border-neutral-200 pb-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              {/* IMAGE */}
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-36 w-full object-cover transition duration-300 hover:scale-105 sm:w-44"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between">
                {/* TOP */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* INFO */}
                  <div>
                    <h2
                      onClick={() => {
                        if (!item.productId?.slug) return;

                        handleToProductDetails(
                          item.productId.slug,
                          item.variantId?._id,
                        );
                      }}
                      className={`text-base font-semibold ${
                        item.productId?.slug
                          ? "cursor-pointer hover:text-primary"
                          : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      {item.color} / {item.size}
                    </p>

                    {/* STOCK STATUS */}
                    {!isProductAvailable ? (
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-red-500">
                        Product unavailable
                      </p>
                    ) : !isVariantAvailable ? (
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-red-500">
                        Variant unavailable
                      </p>
                    ) : isOutOfStock ? (
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-red-500">
                        Out of stock
                      </p>
                    ) : currentStock <= 5 ? (
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-orange-500">
                        {currentStock === 1
                          ? "Last item remaining"
                          : `Only ${item?.variantId?.stock} left`}
                      </p>
                    ) : null}
                  </div>

                  {/* PRICE */}
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-semibold text-[#9B6C43]">
                      ₹{totalPrice?.toFixed(2)}
                    </p>

                    {item.salePrice && (
                      <>
                        <p className="mt-1 text-sm text-neutral-400 line-through">
                          ₹{totalOriginalPrice?.toFixed(2)}
                        </p>

                        <p className="mt-2 text-xs font-medium text-green-600">
                          You save ₹{savedAmount?.toFixed(2)}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* BOTTOM */}
                {isProductAvailable && isVariantAvailable && !isOutOfStock ? (
                  <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    {/* QUANTITY */}
                    <div className="flex w-fit items-center rounded-full border border-neutral-300 bg-white shadow-sm">
                      <button
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.variantId._id, item.quantity - 1)
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-l-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-[45px] text-center text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        disabled={
                          item.quantity >= 5 || item.quantity >= currentStock
                        }
                        onClick={() =>
                          updateQuantity(item.variantId._id, item.quantity + 1)
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-r-full transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ) : null}
                <div className="flex justify-end">
                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.variantId._id)}
                    className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 transition hover:text-red-500"
                  >
                    <X size={15} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemCard;
