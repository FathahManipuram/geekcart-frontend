import { Button } from "@/shared/components/ui/button";
import ItemStatusBadge from "../order-history/ItemStatusBadge";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const OrderItemCard = ({ item, onCancel }) => {
  const canCancel = ["PLACED", "PROCESSING"].includes(item.itemStatus);
const itemPrice = item.salePrice ?? item.price * item.quantity;
  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-lg border"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <div className="mt-2">
                <ItemStatusBadge status={item.itemStatus} />
              </div>
            </div>
            <div>
              <p className="text-sm line-through text-muted-foreground">
                ₹{formatCurrency(item.price * item.quantity)}
              </p>
              <p className="font-semibold">₹{formatCurrency(itemPrice)}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-muted-foreground">
            <div>
              <p>Color</p>
              <p className="font-medium text-black">{item.color}</p>
            </div>

            <div>
              <p>Size</p>
              <p className="font-medium text-black">{item.size}</p>
            </div>

            <div>
              <p>Quantity</p>
              <p className="font-medium text-black">{item.quantity}</p>
            </div>
          </div>
          {item.itemStatus === "CANCELLED" && item.cancellation?.reason && (
            <p className="text-sm text-red-600 mt-2">
              Reason: {item.cancellation.reason}
            </p>
          )}

          <div className="mt-4 flex justify-end">
            {canCancel && (
              <Button variant="destructive" onClick={() => onCancel(item)}>
                Cancel Item
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
