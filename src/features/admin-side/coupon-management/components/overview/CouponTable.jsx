import DataTable from "@/shared/components/DataTable";
import { formatDateForDisplay } from "@/shared/utils/date";
import { Pencil, Trash2, Eye } from "lucide-react";
import CouponActionButton from "./CouponActionButton";
import StatusBadge from "@/shared/components/StatusBadge";
import { STATUS_LABELS_FOR_PROMOTION, STATUS_STYLES_FOR_PROMOTION } from "../../constants/coupon.constants";

const CouponTable = ({ coupons = [], loading, onEdit, onDelete, onView }) => {

  const columns = [
    {
      header: "Campaign",
      cell: (coupon) => (
        <div>
          <p className="text-xs">
            Code: <span className="font-semibold">{coupon.code}</span>
          </p>
          <p className="text-muted-foreground text-wrap ">{coupon?.description}</p>
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
        <StatusBadge
          status={coupon.status}
          statusLabels={STATUS_LABELS_FOR_PROMOTION}
          statusStyles={STATUS_STYLES_FOR_PROMOTION}
        />
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
