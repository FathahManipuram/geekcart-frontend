import { formatCurrency } from "@/shared/utils/formatCurrency";

const ReviewOrderItem = ({ item }) => {
  const originalPrice = item.price;
  const salePrice = item.salePrice ?? item.price;
  const hasDiscount = salePrice < originalPrice;

  return (
    <div className="flex gap-4 py-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md border"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-base">{item.name}</h3>

        <p className="text-sm text-muted-foreground mt-1">
          Size: {item.size} | Color: {item.color}
        </p>

        <p className="text-xs text-muted-foreground mt-0.5">
          Unit Price: ₹{formatCurrency(salePrice)}{" "}
          {hasDiscount && (
            <span className="line-through ml-1 text-gray-400">
              ₹{formatCurrency(originalPrice)}
            </span>
          )}
        </p>

        <p className="text-sm font-medium mt-1">Qty: {item.quantity}</p>
      </div>


      <div className="text-right flex flex-col justify-center">
        {hasDiscount && (
          <p className="line-through text-xs font-medium text-muted-foreground">
            ₹{formatCurrency(originalPrice * item.quantity)}
          </p>
        )}

        <p className="font-semibold text-lg">
          ₹{formatCurrency(salePrice * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export default ReviewOrderItem;
