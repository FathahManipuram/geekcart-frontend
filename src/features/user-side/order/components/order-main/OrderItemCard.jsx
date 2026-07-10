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
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="h-28 w-28 rounded-lg border bg-gray-50 object-cover"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <div className="mt-1.5">
                <ItemStatusBadge status={item.itemStatus} />
              </div>
            </div>

            <div className="text-right">
              {hasDiscount && (
                <p className="text-muted-foreground text-xs line-through">
                  ₹{formatCurrency(originalTotalPrice)}
                </p>
              )}

              <p className="text-lg font-bold text-gray-950">
                ₹{formatCurrency(finalItemPrice)}
              </p>
            </div>
          </div>

          <div className="text-muted-foreground mt-4 grid grid-cols-3 gap-4 border-b pb-4 text-sm">
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
            <div className="mt-4 space-y-1.5 rounded-lg border border-red-100 bg-red-50 p-3 text-xs text-red-700">
              {item.cancellation?.reason && (
                <p className="mb-1 text-sm text-red-900">
                  <span className="font-semibold">Cancellation Reason:</span>{" "}
                  {item.cancellation.reason}
                </p>
              )}
              <div className="text-muted-foreground flex justify-between pt-1">
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
              <div className="mt-1 flex justify-between border-t border-dashed pt-1.5 text-sm font-bold text-emerald-700">
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
                className="cursor-pointer"
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
