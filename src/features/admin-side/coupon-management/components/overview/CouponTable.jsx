import DataTable from "@/shared/components/DataTable";
import { formatDateForDisplay, formatDateTime } from "@/shared/utils/date";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CouponActionButton from "./CouponActionButton";

const CouponTable = ({ coupons = [], loading, onEdit, onDelete, onView }) => {

	const navigate= useNavigate()
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
        <span
          className={`text-sm font-medium ${
            coupon.isActive ? "text-green-600" : "text-red-500"
          }`}
        >
          ● {coupon.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      header: "Actions",
      cell: (coupon) => <CouponActionButton coupon={coupon}/>
      // (
      //   <div className="flex items-center gap-3">
      //     <button onClick={() => onView?.(coupon)}>
      //       <Eye size={16} />
      //     </button>

      //     <button onClick={() =>{
			// console.log("coupon: ", coupon)
			// navigate(`/admin/coupons/${coupon._id}/update`);
		  // } }>
      //       <Pencil size={16} />
      //     </button>

      //     <button onClick={() => onDelete?.(coupon)}>
      //       <Trash2 size={16} className="text-red-500" />
      //     </button>
      //   </div>
      // ),
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
