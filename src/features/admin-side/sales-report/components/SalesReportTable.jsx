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
        <p>{row.user?.fullName}</p>
        <p className="text-xs text-muted-foreground">{row.user?.email}</p>
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
    cell: (row) => `₹${row.discount.toFixed(2)}`,
  },
  {
    header: "Coupon",
    cell: (row) => `₹${(row.coupon?.discountAmount ?? 0).toFixed(2)}`,
  },
  {
    header: "Total",
    cell: (row) => (
      <span className="font-semibold">₹{row.totalAmount.toFixed(2)}</span>
    ),
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
