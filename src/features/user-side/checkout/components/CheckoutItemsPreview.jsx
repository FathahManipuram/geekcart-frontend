import React from 'react'
import { useCartStore } from '../../cart/store/cart.store';

const CheckoutItemsPreview = () => {
	  const cart = useCartStore((state) => state.cart);
  return (
    <div className="bg-white rounded-xl p-4 mb-5">
      <h3 className="font-semibold mb-4">Items ({cart?.items?.length})</h3>

      <div className="space-y-3">
        {cart?.items.map((item) => (
          <div key={item.variantId} className="flex gap-3">
            <img
              src={item.image}
              className="w-14 h-14 rounded-md object-cover"
            />

            <div>
              <p className="text-sm font-medium">{item.name}</p>

              <p className="text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>
                    {item.color} / {item.size}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span>Qty: {item.quantity}</span>
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <div className="flex gap-2 items-center">
                    <span>₹{item.salePrice || item.prcice}</span>
                    {item.salePrice && (
                      <span className="text-neutral-400 line-through">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                </div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutItemsPreview
