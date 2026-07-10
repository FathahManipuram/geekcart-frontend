import React from "react";

const TopProducts = ({ data = [] }) => {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Best Selling Products</h3>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item._id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium">#{index + 1}</span>

              <img
                src={item.image}
                alt={item.name}
                className="h-10 w-10 rounded object-cover"
              />

              <span>{item.name}</span>
            </div>

            <span className="font-semibold">{item.totalSold}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
