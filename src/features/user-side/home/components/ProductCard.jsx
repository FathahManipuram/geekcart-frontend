// src/features/home/components/ProductCard.jsx

import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  image,
  name,
  price,
  slug,
  isActive,
  isWishlisted = false,
  onWishlist,
}) => {

const navigate= useNavigate()

  return (
    <div
      key={slug}
      onClick={() => navigate(`/products/${slug}`)}
      className="relative group cursor-pointer"
    >
      {!isActive && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          Unavailable
        </span>
      )}
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#ece7df]">
        <img
          src={image}
          alt={name}
          className="h-75 sm:h-90 md:h-90 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button onClick={onWishlist} className="absolute top-3 right-3">
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-neutral-700 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="pt-3">
        <h3 className="text-xs md:text-sm font-medium text-neutral-900">
          {name}
        </h3>

        <p className="text-sm md:text-base font-semibold text-amber-700 mt-1">
          ₹{price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
