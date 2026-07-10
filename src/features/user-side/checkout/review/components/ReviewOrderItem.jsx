import { formatCurrency } from "@/shared/utils/formatCurrency";

const ReviewOrderItem = ({ item }) => {
  const originalPrice = item.price;
  const salePrice = item.salePrice ?? item.price;
  const hasDiscount = salePrice < originalPrice;

  return (
    <div className="flex gap-4 border-b py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 rounded-md border object-cover"
      />

      <div className="flex-1">
        <h3 className="text-base font-semibold">{item.name}</h3>

        <p className="text-muted-foreground mt-1 text-sm">
          Size: {item.size} | Color: {item.color}
        </p>

        <p className="text-muted-foreground mt-0.5 text-xs">
          Unit Price: ₹{formatCurrency(salePrice)}{" "}
          {hasDiscount && (
            <span className="ml-1 text-gray-400 line-through">
              ₹{formatCurrency(originalPrice)}
            </span>
          )}
        </p>

        <p className="mt-1 text-sm font-medium">Qty: {item.quantity}</p>
      </div>

      <div className="flex flex-col justify-center text-right">
        {hasDiscount && (
          <p className="text-muted-foreground text-xs font-medium line-through">
            ₹{formatCurrency(originalPrice * item.quantity)}
          </p>
        )}

        <p className="text-lg font-semibold">
          ₹{formatCurrency(salePrice * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default ReviewOrderItem;
