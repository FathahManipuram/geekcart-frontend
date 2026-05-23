// src/features/home/components/ProductCard.jsx

import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  image,
  name,
  price,
  slug,
  isWishlisted = false,
  onWishlist,
}) => {

const navigate= useNavigate()

  return (
    <div
      onClick={() => navigate(`/products/${slug}`)}
      className="group cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#ece7df]">
        <img
          src={image}
          alt={name}
          className="h-55 sm:h-65 md:h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
