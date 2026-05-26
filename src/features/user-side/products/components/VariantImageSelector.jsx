import React from "react";

const VariantImageSelector = ({
  variants = [],

  selectedColor,

  onSelectColor,
}) => {
  /**
   * Unique Variants
   */
  const uniqueVariants = Object.values(
    variants.reduce((acc, variant) => {
      if (!acc[variant.color]) {
        acc[variant.color] = variant;
      }

      return acc;
    }, {}),
  );

  return (
    <div className="mt-8">
      <h3
        className="
          mb-4
          text-sm
          font-semibold
          uppercase
          tracking-wide
        "
      >
        Select Color
      </h3>

      <div
        className="
          flex
          flex-wrap
          gap-4
        "
      >
        {uniqueVariants.map((variant) => {
          const isSelected = selectedColor === variant.color;

          return (
            <button
              key={variant.color}
              type="button"
              onClick={() => onSelectColor(variant.color)}
              className={`
                  relative
                  h-20
                  w-20
                  overflow-hidden
                  rounded-full
                  border-2
                  transition-all
                  
                  ${
                    isSelected ? "border-black scale-105" : "border-neutral-200"
                  }
                `}
            >
              <img
                src={variant.images?.[0]}
                alt={variant.color}
                className="
                    h-full
                    w-full
                    object-cover
                  "
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantImageSelector;
