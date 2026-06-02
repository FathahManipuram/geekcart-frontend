import React from "react";

const VariantImageGallery = ({ variants = [] }) => {
  return (
    <div
      className="
        rounded-xl
        border
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          grid
          grid-cols-12
          gap-4
          border-b
          bg-muted/40
          px-6
          py-4
          text-sm
          font-semibold
        "
      >
        <div className="col-span-2">Color</div>

        <div className="col-span-3">Sizes</div>

        <div className="col-span-7">Gallery</div>
      </div>

      {/* Rows */}
      <div>
        {variants.map((variant, index) => (
          <div
            key={index}
            className="
                grid
                grid-cols-1
                md:grid-cols-12
                gap-4
                border-b
                px-6
                py-5
                items-center
              "
          >
        
            <div className="col-span-2">
              <div
                className="
                    inline-flex
                    rounded-lg
                    border
                    px-3
                    py-1
                    text-sm
                    font-medium
                  "
              >
                {variant.color}
              </div>
            </div>

         
            <div
              className="
                  col-span-3
                  flex
                  flex-wrap
                  gap-2
                "
            >
              {variant.sizes.map((size) => (
                <div
                  key={size}
                  className="
                        rounded-md
                        bg-muted
                        px-3
                        py-1
                        text-xs
                        font-semibold
                      "
                >
                  {size}
                </div>
              ))}
            </div>

           
            <div
              className="
                  col-span-7
                  flex
                  gap-3
                  overflow-x-auto
                "
            >
              {variant.images?.slice(0, 5).map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={variant.color}
                  className="
                          h-24
                          w-24
                          rounded-lg
                          border
                          object-cover
                          shrink-0
                        "
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantImageGallery;
