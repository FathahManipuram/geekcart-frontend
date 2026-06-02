// src/features/products/components/SizeSelector.jsx

const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];

const SizeSelector = ({ selectedSize, onSelectSize, variants = [] }) => {
  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold tracking-widest uppercase">
          Select Size
        </p>

        <button className="text-xs font-medium underline">Size Guide</button>
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
              className={`
                w-12
                h-12
                rounded-md
                border
                text-sm
                font-medium
                transition-all

                ${
                  selectedSize === size
                    ? "bg-[#9c6b3f] text-white border-[#9c6b3f]"
                    : "border-neutral-300 hover:border-black"
                }

                ${
                  !isAvailable
                    ? "opacity-40 cursor-not-allowed line-through"
                    : "cursor-pointer"
                }
              `}
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
