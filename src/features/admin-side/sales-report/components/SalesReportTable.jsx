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
        className="font-medium text-primary hover:underline"
      >
        {row.orderNumber}
      </Link>
    ),
  },
  {
    header: "Customer",
    cell: (row) => (
      <div>
        <p className="font-medium text-sm">{row.user?.fullName || "Guest"}</p>
        <p className="text-xs text-muted-foreground">
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
    // ✅ Sum of all original items' quantities
    header: "Ordered Qty",
    cell: (row) => {
      const qty =
        row.items?.reduce((acc, item) => acc + (item.quantity ?? 0), 0) ?? 0;
      return <span className="text-center block">{qty}</span>;
    },
  },
  {
    // ✅ Sum of quantities where itemStatus is "CANCELLED"
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
          className={`text-center block ${qty > 0 ? "text-destructive font-medium" : ""}`}
        >
          {qty}
        </span>
      );
    },
  },
  {
    // ✅ Sum of quantities where itemStatus is "RETURN_COMPLETED" (or matching your returned flags)
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
          className={`text-center block ${qty > 0 ? "text-orange-500 font-medium" : ""}`}
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
    // ✅ Sums the refundAmount inside each item block if the refund status is COMPLETED
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
    // ✅ Correct Net Total calculation matching standard e-commerce books
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
