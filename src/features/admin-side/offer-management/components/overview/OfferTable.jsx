import DataTable from "@/shared/components/DataTable";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OfferActionButton from "./OfferActionButton";
import StatusBadge from "@/shared/components/StatusBadge";

const OfferTable = ({ offers = [], loading, onDelete }) => {
  const navigate = useNavigate();

  const columns = [
    {
      header: "Offer Name",
      accessor: "name",
    },

    {
      header: "Scope",
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
          <p>{new Date(row.startDate).toLocaleDateString()}</p>

          <p className="text-muted-foreground">
            {new Date(row.expiryDate).toLocaleDateString()}
          </p>
        </div>
      ),
    },

    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.isActive? "active" : "inactive"}/>,
    },

    {
      header: "Actions",
      cell: (row) => <OfferActionButton offer={row}/>,
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
