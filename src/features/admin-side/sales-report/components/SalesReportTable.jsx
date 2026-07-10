import { Link } from "react-router-dom";
import DataTable from "@/shared/components/DataTable";
import { Badge } from "@/shared/components/ui/badge";
import SalesReportTableSkeleton from "./skeletons/SalesReportTableSkeleton";
import { formatDateForDisplay } from "@/shared/utils/date";

const columns = [
  {
    header: "Order No",
    cell: (row) => (
      <Link
        to={`/admin/orders/${row._id}`}
        className="text-primary font-medium hover:underline"
      >
        {row.orderNumber}
      </Link>
    ),
  },
  {
    header: "Customer",
    cell: (row) => (
      <div>
        <p className="text-sm font-medium">{row.user?.fullName || "Guest"}</p>
        <p className="text-muted-foreground text-xs">
          {row.user?.email || "N/A"}
        </p>
      </div>
    ),
  },
  {
    header: "Date",
    cell: (row) => formatDateForDisplay(row.createdAt),
  },
  {
    header: "Ordered Qty",
    cell: (row) => {
      const qty =
        row.items?.reduce((acc, item) => acc + (item.quantity ?? 0), 0) ?? 0;
      return <span className="block text-center">{qty}</span>;
    },
  },
  {
    header: "Cancelled Qty",
    cell: (row) => {
      const qty =
        row.items?.reduce(
          (acc, item) =>
            item.itemStatus === "CANCELLED" ? acc + (item.quantity ?? 0) : acc,
          0,
        ) ?? 0;
      return (
        <span
          className={`block text-center ${qty > 0 ? "text-destructive font-medium" : ""}`}
        >
          {qty}
        </span>
      );
    },
  },
  {
    header: "Returned Qty",
    cell: (row) => {
      const qty =
        row.items?.reduce(
          (acc, item) =>
            item.itemStatus === "RETURN_COMPLETED"
              ? acc + (item.quantity ?? 0)
              : acc,
          0,
        ) ?? 0;
      return (
        <span
          className={`block text-center ${qty > 0 ? "font-medium text-orange-500" : ""}`}
        >
          {qty}
        </span>
      );
    },
  },
  {
    header: "Gross Subtotal",
    cell: (row) => `₹${(row.subtotal ?? 0).toFixed(2)}`,
  },
  {
    header: "Offer Discount",
    cell: (row) => `₹${(row.discount ?? 0).toFixed(2)}`,
  },
  {
    header: "Coupon Discount",
    cell: (row) => `₹${(row.coupon?.discountAmount ?? 0).toFixed(2)}`,
  },
  {
    header: "Refunded Amt",
    cell: (row) => {
      const totalRefunded =
        row.items?.reduce((acc, item) => {
          if (item.refundStatus === "COMPLETED") {
            return acc + (item.refundAmount ?? 0);
          }
          return acc;
        }, 0) ?? 0;

      return (
        <span
          className={
            totalRefunded > 0
              ? "text-destructive font-medium"
              : "text-muted-foreground"
          }
        >
          ₹{totalRefunded.toFixed(2)}
        </span>
      );
    },
  },
  {
    header: "Net Total",
    cell: (row) => {
      const gross = row.subtotal ?? 0;
      const offer = row.discount ?? 0;
      const coupon = row.coupon?.discountAmount ?? 0;

      const totalRefunded =
        row.items?.reduce((acc, item) => {
          if (item.refundStatus === "COMPLETED") {
            return acc + (item.refundAmount ?? 0);
          }
          return acc;
        }, 0) ?? 0;

      const netTotal = gross - offer - coupon - totalRefunded;

      return (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ₹{netTotal.toFixed(2)}
        </span>
      );
    },
  },
  {
    header: "Payment",
    cell: (row) => <Badge variant="outline">{row.paymentStatus}</Badge>,
  },
];

const SalesReportTable = ({ orders, loading }) => {
  return (
    <DataTable
      columns={columns}
      data={orders}
      loading={loading}
      loadingComponent={<SalesReportTableSkeleton />}
      emptyMessage="No sales found."
    />
  );
};

export default SalesReportTable;
