import { BadgeCheck, TrendingDown, TrendingUp, Tag } from "lucide-react";

const CartUpdateBanner = ({ changes = [] }) => {
  if (!changes.length) return null;

  return (
    <div className="mb-8 rounded-2xl border border-primary/20 bg-secondary p-5">
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-5 w-5 text-primary" />

        <h3 className="font-semibold text-primary">
          Your cart has been updated
        </h3>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        Some prices or offers changed since your last visit.
      </p>

      <div className="mt-4 space-y-3">
        {changes.map((change, index) => {
          switch (change.type) {
            case "PRICE_DECREASED":
              return (
                <div key={index} className="flex items-start gap-3">
                  <TrendingDown className="mt-1 h-4 w-4 text-green-600" />

                  <div>
                    <p className="font-medium">{change.productName}</p>

                    <p className="text-sm text-muted-foreground">
                      Price decreased from
                      <span className="mx-1 line-through">
                        ₹{change.oldPrice}
                      </span>
                      to
                      <span className="ml-1 font-semibold text-green-600">
                        ₹{change.newPrice}
                      </span>
                    </p>
                  </div>
                </div>
              );

            case "PRICE_INCREASED":
              return (
                <div key={index} className="flex items-start gap-3">
                  <TrendingUp className="mt-1 h-4 w-4 text-red-500" />

                  <div>
                    <p className="font-medium">{change.productName}</p>

                    <p className="text-sm text-muted-foreground">
                      Price increased from
                      <span className="mx-1">₹{change.oldPrice}</span>
                      to
                      <span className="ml-1 font-semibold text-red-500">
                        ₹{change.newPrice}
                      </span>
                    </p>
                  </div>
                </div>
              );

            case "OFFER_APPLIED":
              return (
                <div key={index} className="flex items-start gap-3">
                  <Tag className="mt-1 h-4 w-4 text-green-600" />

                  <div>
                    <p className="font-medium">{change.productName}</p>

                    <p className="text-sm text-green-700">
                      {change.offerName} has been applied.
                    </p>
                  </div>
                </div>
              );

            case "OFFER_REMOVED":
              return (
                <div key={index} className="flex items-start gap-3">
                  <Tag className="mt-1 h-4 w-4 text-orange-500" />

                  <div>
                    <p className="font-medium">{change.productName}</p>

                    <p className="text-sm text-orange-600">
                      Previous offer has expired.
                    </p>
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default CartUpdateBanner;
