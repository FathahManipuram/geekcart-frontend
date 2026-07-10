import DataTable from "@/shared/components/DataTable";
import { Eye, Pencil } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { formatDateTime } from "@/shared/utils/date";
import { formatCurrency } from "@/shared/utils/formatCurrency"; // Ensure currency utility is imported
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const OrderTable = ({ orders = [], loading = false, onView, onEdit }) => {
  const columns = [
    {
      header: "ORDER NO",
      accessor: "orderNumber",
      cell: (row) => <span className="font-medium">{row.orderNumber}</span>,
    },
    {
      header: "DATE",
      accessor: "createdAt",
      cell: (row) => formatDateTime(row.createdAt),
    },
    {
      header: "CUSTOMER",
      accessor: "customer",
      cell: (row) => (
        <div>
          <p className="font-medium">
            {row.user?.fullName || "Guest Customer"}
          </p>
          <p className="text-muted-foreground text-xs">
            {row.user?.email || "-"}
          </p>
        </div>
      ),
    },
    {
      header: "TOTAL",
      accessor: "totalAmount",
      cell: (row) => {
        const totalRefunds = (row.items || []).reduce(
          (sum, item) => sum + (item.refundAmount ?? 0),
          0,
        );
        const netLiveAmount = Math.max(0, row.totalAmount - totalRefunds);

        return (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">
              ₹{formatCurrency(netLiveAmount)}
            </span>
            {totalRefunds > 0 && (
              <span className="mt-0.5 w-max rounded bg-red-50 px-1 py-0.5 text-[10px] font-medium text-red-600">
                Ref: -₹{formatCurrency(totalRefunds)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: "PAYMENT METHOD",
      accessor: "paymentMethod",
      cell: (row) => (
        <span className="text-sm font-medium text-gray-600">
          {row.paymentMethod}
        </span>
      ),
    },
    {
      header: "PAYMENT",
      accessor: "paymentStatus",
      cell: (row) => <PaymentStatusBadge status={row.paymentStatus} />,
    },
    {
      header: "STATUS",
      accessor: "orderStatus",
      cell: (row) => <OrderStatusBadge status={row.orderStatus} />,
    },

    {
      header: "ACTIONS",
      accessor: "actions",
      cell: (row) => {
        const isActionDisabled =
          row.orderStatus === "DELIVERED" || row.orderStatus === "CANCELLED";

        return (
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={() => onView(row)}>
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(row)}
              disabled={isActionDisabled}
              className="disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      loading={loading}
      emptyMessage="No orders found"
    />
  );
};

export default OrderTable;
