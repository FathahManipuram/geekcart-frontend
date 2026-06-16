import DataTable from "@/shared/components/DataTable";
import { formatDateForDisplay } from "@/shared/utils/date";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CouponActionButton from "./CouponActionButton";
import StatusBadge from "@/shared/components/StatusBadge";

const CouponTable = ({ coupons = [], loading, onEdit, onDelete, onView }) => {

  const columns = [
    {
      header: "Campaign",
      cell: (coupon) => (
        <div>
          <p>{coupon?.description}</p>
          <p className="font-medium">{coupon?.name}</p>

          <p className="text-xs text-muted-foreground">Code: {coupon.code}</p>
        </div>
      ),
    },

    {
      header: "Type",
      cell: (coupon) => (
        <span className="px-2 py-1 rounded-full text-xs bg-muted">
          {coupon.discountType}
        </span>
      ),
    },

    {
      header: "Discount",
      cell: (coupon) =>
        coupon.discountType === "PERCENTAGE"
          ? `${coupon.discountValue}% OFF`
          : `₹${coupon.discountValue} OFF`,
    },

    {
      header: "Usage",
      cell: (coupon) => `${coupon.usedCount}/${coupon.usageLimit}`,
    },

    {
      header: "Period",
      cell: (coupon) => (
        <div>
          <p>{formatDateForDisplay(coupon?.startDate)}</p>

          <p className="text-xs text-muted-foreground">
            {formatDateForDisplay(coupon?.expiryDate)}
          </p>
        </div>
      ),
    },

    {
      header: "Status",
      cell: (coupon) => (
        <StatusBadge status={coupon.isActive ? "active" : "inactive"} />
      ),
    },

    {
      header: "Actions",
      cell: (coupon) => <CouponActionButton coupon={coupon} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={coupons}
      loading={loading}
      emptyMessage="No coupons found"
    />
  );
};

export default CouponTable;
