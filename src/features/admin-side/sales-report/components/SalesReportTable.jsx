import { Link } from "react-router-dom";

import DataTable from "@/shared/components/DataTable";
import { Badge } from "@/shared/components/ui/badge";
import SalesReportTableSkeleton from "./skeletons/SalesReportTableSkeleton";
import { formatDateForDisplay } from "@/shared/utils/date";

const columns = [
  {
    header: "Order",
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
        <p>{row.user?.fullName || "Guest"}</p>
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
    header: "Gross",
    cell: (row) => `₹${row.subtotal.toFixed(2)}`,
  },
  {
    header: "Offer",
    cell: (row) => `₹${(row.discount ?? 0).toFixed(2)}`,
  },
  {
    header: "Coupon",
    cell: (row) => `₹${(row.coupon?.discountAmount ?? 0).toFixed(2)}`,
  },
  {
    // ✅ CHANGED: Explicitly calculating Net Sales (Gross - Offers - Coupons)
    header: "Net Sales",
    cell: (row) => {
      const gross = row.subtotal;
      const offer = row.discount ?? 0;
      const coupon = row.coupon?.discountAmount ?? 0;
      const netSales = gross - offer - coupon;

      return (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          ₹{netSales.toFixed(2)}
        </span>
      );
    },
  },
  {
    header: "Status",
    cell: (row) => <Badge variant="secondary">{row.orderStatus}</Badge>,
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
