import React from "react";
const CheckoutItemsPreview = ({ cart }) => {
  return (
    <div className="mb-5 rounded-xl bg-white p-4">
      <h3 className="mb-4 font-semibold">Items ({cart?.items?.length})</h3>

      <div className="space-y-3">
        {cart?.items.map((item) => (
          <div key={item.variantId._id} className="flex gap-3">
            <img
              src={item.image}
              className="h-14 w-14 rounded-md object-cover"
            />

            <div>
              <p className="text-sm font-medium">{item.name}</p>

              <div className="text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>
                    {item.color} / {item.size}
                  </span>
                  <div className="bg-accent h-1 w-1 rounded-full" />
                  <span>Qty: {item.quantity}</span>
                  <div className="bg-accent h-1 w-1 rounded-full" />
                  <div className="flex items-center gap-2">
                    <span>₹{item.salePrice || item.prcice}</span>
                    {item.salePrice != null && item.salePrice < item.price && (
                      <span className="text-neutral-400 line-through">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutItemsPreview;
