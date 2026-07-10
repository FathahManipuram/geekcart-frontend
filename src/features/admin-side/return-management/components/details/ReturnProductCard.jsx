import React from "react";

const ReturnProductCard = ({ returnRequest }) => {
  const item = returnRequest?.itemSnapshot;

  const basePrice = item?.priceAtPurchase || 0;
  const couponDiscount = item?.couponDiscount || 0;
  const offerDiscount = item?.appliedOffer?.discountAmount || 0;

  const truePurchasePrice = basePrice - couponDiscount - offerDiscount;
  const hasDiscount = couponDiscount > 0 || offerDiscount > 0;

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">Product Details</h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        <img
          src={item?.image}
          alt={item?.name}
          className="h-52 w-52 rounded-lg border object-cover"
        />

        <div className="flex-1">
          <h3 className="text-3xl font-semibold">{item?.name}</h3>

          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase">Size</p>
              <p className="mt-1 font-medium">{item?.size || "-"}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs uppercase">Color</p>
              <p className="mt-1 font-medium">{item?.color || "-"}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs uppercase">
                Purchase Price
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-foreground text-lg font-semibold">
                  ₹{truePurchasePrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-muted-foreground text-sm line-through">
                    ₹{basePrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-muted-foreground text-xs uppercase">
              Return Reason
            </p>
            <p className="mt-2 font-medium">{returnRequest?.reason}</p>
          </div>

          {returnRequest?.customerComment && (
            <div className="mt-8">
              <p className="text-muted-foreground text-xs uppercase">
                Customer Comment
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {returnRequest.customerComment}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnProductCard;
