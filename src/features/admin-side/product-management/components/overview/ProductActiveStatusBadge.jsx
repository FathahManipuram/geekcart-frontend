import React from 'react'

const ProductActiveStatusBadge = () => {
  const statusStyles = {
    active: "bg-green-100 text-green-700",

    inactive: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    active: "ACTIVE",

    inactive: "INACTIVE",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-[10px]
        font-semibold
        ${statusStyles[status]}
      `}
    >
      ● {statusLabels[status]}
    </span>
  );
};

export default ProductActiveStatusBadge
