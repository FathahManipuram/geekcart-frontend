import ItemStatusBadge from "@/features/user-side/order/components/order-history/ItemStatusBadge";
import DataTable from "@/shared/components/DataTable";
import { Button } from "@/shared/components/ui/button";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { Pencil } from "lucide-react";

const OrderItemsTable = ({ items = [], onEdit }) => {
  const columns = [
    {
      header: "Product",
      cell: (item) => (
        <div className="flex gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="h-12 w-12 rounded border object-cover"
          />
          <div>
            <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
            <p className="text-muted-foreground text-xs">
              {item.color} / {item.size}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Qty",
      accessor: "quantity",
      cell: (item) => (
        <span className="font-medium text-gray-700">{item.quantity}</span>
      ),
    },
    {
      header: "Status",
      cell: (item) => <ItemStatusBadge status={item.itemStatus} />,
    },
    {
      header: "Unit / Sale Price",
      cell: (item) => {
        const hasPromoMarkdown = item.salePrice && item.salePrice < item.price;
        return (
          <div className="flex flex-col text-sm">
            {hasPromoMarkdown && (
              <span className="text-muted-foreground text-xs line-through">
                ₹{formatCurrency(item.price)}
              </span>
            )}
            <span className="font-medium text-gray-900">
              ₹{formatCurrency(item.salePrice ?? item.price)}
            </span>
          </div>
        );
      },
    },
    {
      header: "Net Paid",
      cell: (item) => {
        const itemSubtotal = (item.salePrice ?? item.price) * item.quantity;
        const couponDeduction = item.couponDiscount ?? 0;
        const netPaidPrice = Math.max(0, itemSubtotal - couponDeduction);

        return (
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-900">
              ₹{formatCurrency(netPaidPrice)}
            </span>
            {couponDeduction > 0 && (
              <span className="text-[11px] font-medium text-emerald-600">
                (Coupon: -₹{formatCurrency(couponDeduction)})
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: "Total / Refunded",
      cell: (item) => {
        const itemSubtotal = (item.salePrice ?? item.price) * item.quantity;
        const couponDeduction = item.couponDiscount ?? 0;
        const netPaidPrice = Math.max(0, itemSubtotal - couponDeduction);

        const isSettledAway = ["CANCELLED", "RETURN_COMPLETED"].includes(
          item.itemStatus,
        );
        const actualRefund = item.refundAmount ?? 0;

        return (
          <div className="flex flex-col font-medium">
            <span
              className={`text-sm ${isSettledAway ? "text-muted-foreground font-normal line-through" : "text-gray-900"}`}
            >
              ₹{formatCurrency(netPaidPrice)}
            </span>
            {isSettledAway && (
              <span className="mt-0.5 w-max rounded border border-red-100 bg-red-50 px-1.5 py-0.5 text-xs font-bold text-red-600">
                Refunded: ₹{formatCurrency(actualRefund)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: "Actions",
      cell: (item) => {
        const isEditable = ![
          "DELIVERED",
          "CANCELLED",
          "RETURN_COMPLETED",
        ].includes(item.itemStatus);
        return (
          <Button
            disabled={!isEditable}
            onClick={() => onEdit(item)}
            variant="outline"
            size="sm"
          >
            <Pencil size={16} />
          </Button>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={items}
      rowKey="_id"
      emptyMessage="No items found"
    />
  );
};

export default OrderItemsTable;
