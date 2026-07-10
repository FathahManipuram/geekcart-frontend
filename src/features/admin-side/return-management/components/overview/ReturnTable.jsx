import DataTable from "@/shared/components/DataTable";
import React from "react";
import ReturnStatusBadge from "./ReturnStatusBadge";
import { Button } from "@/shared/components/ui/button";
import { CheckCircle2, Clock3, Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/shared/utils/date";
import { Badge } from "@/shared/components/ui/badge";

const ReturnTable = ({ returns, loading, onSelect }) => {
  const navigate = useNavigate();

  const columns = [
    {
      header: "Order Details",

      cell: (row) => (
        <div className="flex gap-3">
          <img
            src={row.itemSnapshot?.image}
            alt={row.itemSnapshot?.name}
            className="h-14 w-14 rounded object-cover"
          />

          <div className="text-wrap sm:pr-15">
            <p className="font-medium">#{row.order?.orderNumber}</p>
            <p className="text-muted-foreground text-sm">
              {row.itemSnapshot?.name}
            </p>
            <div className="flex gap-2 text-xs">
              <span>{row.itemSnapshot?.size}</span>
              <span>{row.itemSnapshot?.color}</span>
            </div>
          </div>
        </div>
      ),
    },

    {
      header: "Customer",
      accessor: "customerName",
      cell: (row) => (
        <>
          <div className="text-wrap">
            <p className="font-medium">{row?.user?.fullName}</p>
            <p className="text-muted-foreground text-sm">{row.user?.email}</p>
          </div>
        </>
      ),
    },

    {
      header: "Reason",
      accessor: "reason",
    },

    {
      header: "Status",
      accessor: "status",

      cell: (row) => <ReturnStatusBadge status={row.status} />,
    },

    {
      header: "Refund Amount",
      accessor: "refundAmount",

      cell: (row) => <span>₹{row.refundAmount}</span>,
    },

    {
      header: "Refund Status",
      accessor: "refundStatus",

      cell: (row) => {
        const status = row.refundStatus;

        return status === "COMPLETED" ? (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Refunded
          </Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock3 className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      },
    },

    {
      header: "Requested Date",
      accessor: "requStedDate",

      cell: (row) => formatDateTime(row.updatedAt),
    },
    {
      header: "ACTIONS",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigate(`/admin/returns/${row._id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onSelect(row)}
            disabled={
              row.status === "RETURN_COMPLETED" ||
              row.status === "RETURN_REJECTED"
                ? "disabled"
                : ""
            }
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={returns}
        loading={loading}
        emptyMessage="No return requests found"
      />
    </>
  );
};

export default ReturnTable;
