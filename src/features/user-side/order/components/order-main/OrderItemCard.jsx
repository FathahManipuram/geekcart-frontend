import { Button } from "@/shared/components/ui/button";
import ItemStatusBadge from "../order-history/ItemStatusBadge";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const OrderItemCard = ({ item, order, onCancel }) => {
  const canCancel = ["PLACED", "PROCESSING"].includes(item.itemStatus);
  const isInactive = ["CANCELLED", "RETURN_COMPLETED"].includes(
    item.itemStatus,
  );

  const originalTotalPrice = item.price * item.quantity;
  const totalItemPrice = (item.salePrice ?? item.price) * item.quantity;
  const couponShareDeducted = item.couponDiscount ?? 0;


  const finalItemPrice = Math.max(0, totalItemPrice - couponShareDeducted);


  const hasDiscount =
    (item.salePrice !== null && item.salePrice < item.price) ||
    couponShareDeducted > 0;

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="flex gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-lg border bg-gray-50"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {item.name}
              </h3>
              <div className="mt-1.5">
                <ItemStatusBadge status={item.itemStatus} />
              </div>
            </div>

            <div className="text-right">
              {hasDiscount && (
                <p className="text-xs line-through text-muted-foreground">
                  ₹{formatCurrency(originalTotalPrice)}
                </p>
              )}

              <p className="font-bold text-lg text-gray-950">
                ₹{formatCurrency(finalItemPrice)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-muted-foreground border-b pb-4">
            <div>
              <p className="text-xs">Color</p>
              <p className="font-medium text-black">{item.color}</p>
            </div>
            <div>
              <p className="text-xs">Size</p>
              <p className="font-medium text-black">{item.size}</p>
            </div>
            <div>
              <p className="text-xs">Quantity</p>
              <p className="font-medium text-black">{item.quantity}</p>
            </div>
          </div>

          {isInactive && (
            <div className="mt-4 p-3 rounded-lg border text-xs space-y-1.5 bg-red-50 border-red-100 text-red-700">
              {item.cancellation?.reason && (
                <p className="text-sm mb-1 text-red-900">
                  <span className="font-semibold">Cancellation Reason:</span>{" "}
                  {item.cancellation.reason}
                </p>
              )}
              <div className="flex justify-between text-muted-foreground pt-1">
                <span>Original Item Total:</span>
                <span className="font-medium text-black">
                  ₹{formatCurrency(totalItemPrice)}
                </span>
              </div>
              {couponShareDeducted > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Coupon Share Deducted:</span>
                  <span>-₹{formatCurrency(couponShareDeducted)}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-700 font-bold text-sm pt-1.5 border-t border-dashed mt-1">
                <span>Total Refunded:</span>
                <span>
                  +₹{formatCurrency(item.refundAmount ?? finalItemPrice)}
                </span>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-col items-end gap-1.5">
            {canCancel && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(item)}
              >
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
