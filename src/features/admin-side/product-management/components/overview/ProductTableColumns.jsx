import React from 'react'
import ProductStatusBadge from './ProductStatusBadge';
import ProductActionButton from './ProductActionButton';


	export const ProductTableColumns = [
    {
      header: "IMAGE",

      cell: (product) => (
        <img
          src={product.coverImage}
          alt={product.name}
          className="
            h-16
            w-16
            rounded-md
            object-cover
          "
        />
      ),
    },
    {
      header: "PRODUCT DETAILS",

      cell: (product) => (
        <div>
          <h3 className="font-semibold">{product.name}</h3>

          <p className="text-sm text-muted-foreground">
            SKU: {product?.variants?.[0]?.sku}
          </p>
        </div>
      ),
    },

    {
      header: "SUBCATEGORY",

      cell: (product) => (
        <span
          className="
            rounded-full
            bg-muted
            px-3
            py-1
            text-xs
            font-semibold
          "
        >
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
            <div
              className="
            text-xs
            border
            px-2
            py-1
            rounded
          "
            >
              {product?.sleeve}
            </div>

            <div
              className="
            text-xs
            border
            px-2
            py-1
            rounded
          "
            >
              {product?.fabric}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex flex-wrap gap-2">
            {product?.variants?.map((variant, index) => (
              <div
                key={index}
                className="
                text-xs
                bg-muted
                px-2
                py-1
                rounded
              "
              >
                {variant.size}
              </div>
            ))}
          </div>
        </div>
      ),
    },

    {
      header: "PRICE",

      cell: (product) => (
        <span className="font-semibold">₹{product.price}</span>
      ),
    },

    {
      header: "STOCK",

      cell: (product) => (
        <div>
          <p className="font-semibold">{product.stock}</p>

          <p className="text-xs text-muted-foreground">Units</p>
        </div>
      ),
    },

    {
      header: "STATUS",

      cell: (product) => <ProductStatusBadge status={product.status} />,
    },

    {
      header: "ACTIONS",

      cell: (product) => <ProductActionButton product={product} />,
    },
  ];


