import { Heart } from "lucide-react";

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  /**
   * Variant
   */
  const firstVariant = product?.variants?.[0];

  /**
   * Image
   */
  const image = firstVariant?.images?.[0] || product?.coverImage;

  /**
   * Price
   */
  const price = firstVariant?.salePrice || firstVariant?.price;

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      {/* IMAGE */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-neutral-100
        "
      >
        <img
          src={image}
          alt={product.name}
          className="
            aspect-[3/4]
            w-full
            object-cover
            transition-transform
            duration-500

            group-hover:scale-105
          "
        />

        {/* WISHLIST */}
        <button
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-white/90
            p-2
            backdrop-blur
          "
        >
          <Heart size={18} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="mt-4">
        {/* NAME */}
        <h3
          className="
            line-clamp-1
            text-sm
            font-semibold

            md:text-base
          "
        >
          {product.name}
        </h3>

        {/* SUBCATEGORY */}
        <p
          className="
            mt-1
            text-xs
            text-neutral-500

            md:text-sm
          "
        >
          {product?.subcategory?.name}
        </p>

        {/* PRICE */}
        <div
          className="
            mt-2
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              font-semibold
              text-[#9B6C43]
            "
          >
            ₹{price?.toLocaleString()}
          </span>

          {firstVariant?.salePrice && (
            <span
              className="
                text-sm
                text-neutral-400
                line-through
              "
            >
              ₹{firstVariant?.price?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
