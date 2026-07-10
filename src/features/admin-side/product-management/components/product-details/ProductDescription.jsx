import React from "react";

const ProductDescription = ({ product }) => {
  const manufacturer = [
    {
      label: "NAME",
      value: product?.manufacturer?.name,
    },

    {
      label: "EMAIL",

      value: product?.manufacturer?.email,
    },

    {
      label: "PHONE NUMBER",

      value: product?.manufacturer?.phone,
    },

    {
      label: "ADDRESSS",

      value: product?.manufacturer?.address,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.7fr_0.8fr]">
      <div className="overflow-hidden rounded-xl border bg-white p-8">
        <h3 className="text-muted-foreground mb-3 text-xs font-bold tracking-[0.3em]">
          PRODUCT DESCRIPTION
        </h3>
        <p>{product.description}</p>
      </div>
      <div className="rounded-xl border bg-white p-8">
        {/* Title */}
        <h3 className="text-muted-foreground text-xs font-bold tracking-[0.3em]">
          MANUFACTURER
        </h3>

        {/* Specification List */}
        <div className="mt-4 space-y-3">
          {manufacturer.map((item) => (
            <div key={item.label}>
              <p className="text-muted-foreground text-[10px] font-bold tracking-[0.2em]">
                {item.label}
              </p>

              <p className="text-xs">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
