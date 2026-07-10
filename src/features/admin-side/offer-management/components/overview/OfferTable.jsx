import DataTable from "@/shared/components/DataTable";
import { Badge } from "@/shared/components/ui/badge";
import OfferActionButton from "./OfferActionButton";
import StatusBadge from "@/shared/components/StatusBadge";
import { formatDateForDisplay } from "@/shared/utils/date";
import {
  STATUS_LABELS_FOR_PROMOTION,
  STATUS_STYLES_FOR_PROMOTION,
} from "@/features/admin-side/coupon-management/constants/coupon.constants";

const OfferTable = ({ offers = [], loading }) => {
  const columns = [
    {
      header: "Offer Name",
      cell: (row) => (
        <div>
          <p className="font-semibold">{row.name}</p>
          <p className="text-muted-foreground text-xs text-wrap">
            {row.description}
          </p>
        </div>
      ),
    },

    {
      header: "Target",
      cell: (row) => <Badge variant="secondary">{row.offerType}</Badge>,
    },

    {
      header: "Discount",
      cell: (row) =>
        row.discountType === "PERCENTAGE"
          ? `${row.discountValue}%`
          : `₹${row.discountValue}`,
    },

    {
      header: "Validity",
      cell: (row) => (
        <div className="text-sm">
          <p>{formatDateForDisplay(row.startDate)}</p>

          <p className="text-muted-foreground">
            {formatDateForDisplay(row.expiryDate)}
          </p>
        </div>
      ),
    },

    {
      header: "Status",
      cell: (row) => (
        <StatusBadge
          status={row.status}
          statusLabels={STATUS_LABELS_FOR_PROMOTION}
          statusStyles={STATUS_STYLES_FOR_PROMOTION}
        />
      ),
    },

    {
      header: "Actions",
      cell: (row) => <OfferActionButton offer={row} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={offers}
      loading={loading}
      emptyMessage="No offers found"
    />
  );
};

export default OfferTable;
