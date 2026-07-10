// src/features/products/components/SizeSelector.jsx

import { useState } from "react";
import SizeGuideModal from "./SizeGuideModal";
import Modal from "@/shared/components/Modal";

const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];

const SizeSelector = ({ selectedSize, onSelectSize, variants = [] }) => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  return (
    <div>
      {/* Heading */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-semibold tracking-widest uppercase">
          Select Size
        </p>

        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="text-sm font-medium text-neutral-600 underline transition-colors hover:text-black"
        >
          Size Guide
        </button>
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      </div>

      {/* Sizes */}
      <div className="flex flex-wrap gap-3">
        {ALL_SIZES.map((size) => {
          // find variant for current size
          const matchedVariant = variants.find(
            (variant) => variant.size === size,
          );

          // check stock
          const isAvailable = matchedVariant && matchedVariant.stock > 0;

          return (
            <button
              key={size}
              onClick={() => isAvailable && onSelectSize(size)}
              disabled={!isAvailable}
              className={`h-12 w-12 rounded-md border text-sm font-medium transition-all ${
                selectedSize === size
                  ? "border-[#9c6b3f] bg-[#9c6b3f] text-white"
                  : "border-neutral-300 hover:border-black"
              } ${
                !isAvailable
                  ? "cursor-not-allowed line-through opacity-40"
                  : "cursor-pointer"
              } `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
