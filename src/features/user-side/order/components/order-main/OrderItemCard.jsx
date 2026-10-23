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
    <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        {/* TOP ROW FOR MOBILE: IMAGE + TITLE & PRICE */}
        <div className="flex gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 shrink-0 rounded-lg border bg-gray-50 object-cover sm:h-28 sm:w-28"
          />

          <div className="flex flex-1 flex-col justify-between sm:hidden">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {item.name}
              </h3>
              <div className="mt-1">
                <ItemStatusBadge status={item.itemStatus} />
              </div>
            </div>

            <div className="mt-2">
              {hasDiscount && (
                <p className="text-muted-foreground text-[11px] line-through">
                  ₹{formatCurrency(originalTotalPrice)}
                </p>
              )}
              <p className="text-base font-bold text-gray-950">
                ₹{formatCurrency(finalItemPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="flex-1">
          {/* DESKTOP HEADER (TITLE + PRICE) */}
          <div className="hidden items-start justify-between sm:flex">
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

          {/* ITEM ATTRIBUTES (COLOR, SIZE, QUANTITY) */}
          <div className="text-muted-foreground mt-2 grid grid-cols-3 gap-2 border-b pb-3 text-xs sm:mt-4 sm:gap-4 sm:pb-4 sm:text-sm">
            <div>
              <p className="text-[11px] sm:text-xs">Color</p>
              <p className="font-medium text-black">{item.color}</p>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs">Size</p>
              <p className="font-medium text-black">{item.size}</p>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs">Quantity</p>
              <p className="font-medium text-black">{item.quantity}</p>
            </div>
          </div>

          {/* INACTIVE / CANCELLATION DETAILS */}
          {isInactive && (
            <div className="mt-3 space-y-1.5 rounded-lg border border-red-100 bg-red-50 p-3 text-xs text-red-700 sm:mt-4">
              {item.cancellation?.reason && (
                <p className="mb-1 text-xs text-red-900 sm:text-sm">
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
              <div className="mt-1 flex justify-between border-t border-dashed pt-1.5 text-xs font-bold text-emerald-700 sm:text-sm">
                <span>Total Refunded:</span>
                <span>
                  +₹{formatCurrency(item.refundAmount ?? finalItemPrice)}
                </span>
              </div>
            </div>
          )}

          {/* CANCEL ACTION BUTTON */}
          {canCancel && (
            <div className="mt-3 flex justify-end sm:mt-4">
              <Button
                className="w-full cursor-pointer sm:w-auto"
                variant="destructive"
                size="sm"
                onClick={() => onCancel(item)}
              >
                Cancel Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
