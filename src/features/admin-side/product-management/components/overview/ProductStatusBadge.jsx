import React from 'react'

const ProductStatusBadge = ({status}) => {
	const statusStyles = {
    "in-stock": "bg-green-100 text-green-700",

    "low-stock": "bg-amber-100 text-amber-700",

    "out-of-stock": "bg-red-100 text-red-700",
  };


const statusLabels = {
  "in-stock": "IN STOCK",

  "low-stock": "LOW STOCK",

  "out-of-stock": "OUT OF STOCK",
};

  return (
    <>
      <span
        className={`inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-[10px]
        font-semibold
		${statusStyles[status]}
		`}
      >
        ●{" "}
        {statusLabels[status]}
      </span>
    </>
  );
}

export default ProductStatusBadge
