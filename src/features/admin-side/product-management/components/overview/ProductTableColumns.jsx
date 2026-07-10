import React from "react";
import ProductActionButton from "./ProductActionButton";
import StatusBadge from "@/shared/components/StatusBadge";

export const ProductTableColumns = [
  {
    header: "IMAGE",

    cell: (product) => (
      <img
        src={product.coverImage}
        alt={product.name}
        className="h-16 w-16 rounded-md object-cover"
      />
    ),
  },
  {
    header: "PRODUCT DETAILS",

    cell: (product) => (
      <div>
        <h3 className="font-semibold">{product.name}</h3>

        <p className="text-muted-foreground text-sm">
          SKU: {product?.variants?.[0]?.sku}
        </p>
      </div>
    ),
  },

  {
    header: "SUBCATEGORY",

    cell: (product) => (
      <span className="bg-muted rounded-full px-3 py-1 text-xs font-semibold">
        {product?.subcategory?.name}
      </span>
    ),
  },

  {
    header: "ATTRIBUTES",

    cell: (product) => (
      <div className="space-y-2">
        {/* Sleeve + Fabric */}
        <div className="flex flex-wrap gap-2">
          <div className="rounded border px-2 py-1 text-xs">
            {product?.sleeve}
          </div>

          <div className="rounded border px-2 py-1 text-xs">
            {product?.fabric}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-2">
          {[...new Set((product?.variants || []).map((v) => v.size))].map(
            (size, index) => (
              <div key={index} className="bg-muted rounded px-2 py-1 text-xs">
                {size}
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },

  {
    header: "PRICE",

    cell: (product) => <span className="font-semibold">₹{product.price}</span>,
  },

  {
    header: "STOCK",

    cell: (product) => (
      <div>
        <p className="font-semibold">{product.stock}</p>

        <p className="text-muted-foreground text-xs">Units</p>
      </div>
    ),
  },

  {
    header: "STATUS",

    cell: (product) => (
      <StatusBadge status={product.isActive ? "active" : "inactive"} />
    ),
  },

  {
    header: "ACTIONS",

    cell: (product) => <ProductActionButton product={product} />,
  },
];
