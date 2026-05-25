import React from "react";

import ProductStatusBadge from "../overview/ProductStatusBadge";

const getStatus = (stock) => {
  if (stock === 0) {
    return "out-of-stock";
  }

  if (stock < 5) {
    return "low-stock";
  }

  return "in-stock";
};

export const variantDetailsColumns = [
  {
    header: "VARIANT",

    cell: (variant) => (
      <div
        className="
            flex
            items-center
            gap-3
          "
      >
        <img
          src={variant.images?.[0] || "https://placehold.co/80x80"}
          alt={variant.color}
          className="
              h-12
              w-12
              rounded-lg
              border
              object-cover
            "
        />

        {/* Details */}
        <div
          className="
              space-y-1
            "
        >
          {/* Color */}
          <div
            className="
                inline-flex
                rounded-full
                border
                px-2
                py-0.5
                text-[10px]
                font-medium
              "
          >
            {variant.color}
          </div>

          {/* Size */}
          <p
            className="
                text-xs
                font-semibold
              "
          >
            Size: {variant.size}
          </p>
        </div>
      </div>
    ),
  },

  /**
   * Stock
   */
  {
    header: "STOCK",

    cell: (variant) => (
      <div
        className="
            text-sm
            font-medium
          "
      >
        {variant.stock} Units
      </div>
    ),
  },

  /**
   * SKU
   */
  {
    header: "SKU",

    cell: (variant) => (
      <span
        className="
            text-xs
            text-muted-foreground
            font-mono
          "
      >
        {variant.sku}
      </span>
    ),
  },

  /**
   * Status
   */
  {
    header: "STATUS",

    cell: (variant) => <ProductStatusBadge status={getStatus(variant.stock)} />,
  },

  /**
   * Price
   */
  {
    header: "PRICE",

    cell: (variant) => (
      <div
        className="
            text-sm
            font-bold
          "
      >
        ₹{variant.price?.toLocaleString()}
      </div>
    ),
  },

  /**
   * Sale Price
   */
  {
    header: "SALE PRICE",

    cell: (variant) =>
      variant.salePrice ? (
        <div
          className="
              text-sm
              font-semibold
              text-green-600
            "
        >
          ₹{variant.salePrice?.toLocaleString()}
        </div>
      ) : (
        <span
          className="
              text-xs
              text-muted-foreground
            "
        >
          —
        </span>
      ),
  },
];
