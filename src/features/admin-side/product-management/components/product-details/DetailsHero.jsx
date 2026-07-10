import React from "react";

const DetailsHero = ({ product }) => {
  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-white">
        <img
          src={product.coverImage}
          alt="Product"
          className="h-100 w-full object-cover"
        />
      </div>
    </>
  );
};

export default DetailsHero;
