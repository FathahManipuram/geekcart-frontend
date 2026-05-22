import React from 'react'
import ProductStatusBadge from '../overview/ProductStatusBadge'



const getStatus=(stock)=>{
	if(stock===0){
		return "out-of-stock"
	}

	if(stock < 5){
		return "low-stock"
	}

	return "in-stock"
}


export const variantDetailsColumns = [
  {
    header: "SIZE",
    cell: (variant) => (
      <span
        className="
            text-sm
            font-bold
          "
      >
        {variant.size}
      </span>
    ),
  },

  {
    header: "STOCK LEVEL",
    cell: (variant) => <div className="text-sm">{variant.stock} Units</div>,
  },

  {
    header: "SKU",
    cell: (variant) => (
      <span
        className="
            text-sm
            text-muted-foreground
          "
      >
        {variant.sku}
      </span>
    ),
  },

  {
    header: "STATUS",
    cell: (variant) => <ProductStatusBadge status={getStatus(variant.stock)} />,
  },

  {
    header: "PRICE",
    cell: (variant) => (
      <div
        className="
            text-right
            text-sm
            font-bold
          "
      >
        ₹{variant.price?.toLocaleString()}
      </div>
    ),
  },
];
