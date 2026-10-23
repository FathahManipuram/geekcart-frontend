import DataTable from "@/shared/components/DataTable";
import React from "react";
import ReturnStatusBadge from "./ReturnStatusBadge";
import { Button } from "@/shared/components/ui/button";
import { CheckCircle2, Clock3, Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/shared/utils/date";
import { Badge } from "@/shared/components/ui/badge";

const ReturnTable = ({ returns = [], loading, onSelect }) => {
  const navigate = useNavigate();

  const columns = [
    {
      header: "Order Details",
      cell: (row) => (
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={row.itemSnapshot?.image}
            alt={row.itemSnapshot?.name || "Product Image"}
            className="h-12 w-12 shrink-0 rounded border border-neutral-100 object-cover sm:h-14 sm:w-14"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-900 sm:text-base">
              #{row.order?.orderNumber}
            </p>
            <p className="text-muted-foreground truncate text-xs sm:text-sm">
              {row.itemSnapshot?.name}
            </p>
            <div className="mt-0.5 flex gap-2 text-xs text-neutral-500">
              {row.itemSnapshot?.size && (
                <span>Size: {row.itemSnapshot?.size}</span>
              )}
              {row.itemSnapshot?.color && (
                <span>Color: {row.itemSnapshot?.color}</span>
              )}
            </div>
          </div>
        </div>
      ),
    },

    {
      header: "Customer",
      accessor: "customerName",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-900">
            {row?.user?.fullName}
          </p>
          <p className="text-muted-foreground truncate text-xs sm:text-sm">
            {row.user?.email}
          </p>
        </div>
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
      cell: (row) => <span className="font-medium">₹{row.refundAmount}</span>,
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
      cell: (row) => {
        const isActionDisabled =
          row.status === "RETURN_COMPLETED" || row.status === "RETURN_REJECTED";

        return (
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate(`/admin/returns/${row._id}`)}
              title="View Details"
            >
              <Eye className="h-4 w-4 text-neutral-600" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => onSelect(row)}
              disabled={isActionDisabled}
              title="Edit Return"
            >
              <Pencil className="h-4 w-4 text-neutral-600" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-neutral-500">
        Loading return requests...
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout (Visible on screens smaller than md) */}
      <div className="block space-y-4 md:hidden">
        {returns.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-center text-sm text-neutral-500">
            No return requests found
          </div>
        ) : (
          returns.map((row) => {
            const isActionDisabled =
              row.status === "RETURN_COMPLETED" ||
              row.status === "RETURN_REJECTED";

            return (
              <div
                key={row._id}
                className="space-y-3 rounded-2xl border bg-white p-4 shadow-sm"
              >
                {/* Header: Product details & status badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={row.itemSnapshot?.image}
                      alt={row.itemSnapshot?.name || "Product"}
                      className="h-12 w-12 shrink-0 rounded border object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-neutral-900">
                        #{row.order?.orderNumber}
                      </p>
                      <p className="truncate text-xs text-neutral-500">
                        {row.itemSnapshot?.name}
                      </p>
                      <div className="mt-0.5 flex gap-2 text-[11px] text-neutral-400">
                        {row.itemSnapshot?.size && (
                          <span>Size: {row.itemSnapshot?.size}</span>
                        )}
                        {row.itemSnapshot?.color && (
                          <span>Color: {row.itemSnapshot?.color}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ReturnStatusBadge status={row.status} />
                </div>

                {/* Customer Info */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-xs">
                  <span className="font-medium text-neutral-500">
                    Customer:
                  </span>
                  <div className="max-w-[65%] min-w-0 text-right">
                    <p className="truncate font-medium text-neutral-800">
                      {row?.user?.fullName}
                    </p>
                    <p className="truncate text-[11px] text-neutral-400">
                      {row?.user?.email}
                    </p>
                  </div>
                </div>

                {/* Reason */}
                {row.reason && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-500">
                      Reason:
                    </span>
                    <span className="max-w-[65%] truncate text-right font-medium text-neutral-800">
                      {row.reason}
                    </span>
                  </div>
                )}

                {/* Refund Info */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-500">
                    Refund Amount:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">
                      ₹{row.refundAmount}
                    </span>
                    {row.refundStatus === "COMPLETED" ? (
                      <Badge className="bg-green-100 px-1.5 py-0 text-[10px] text-green-700 hover:bg-green-100">
                        Refunded
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 px-1.5 py-0 text-[10px] text-yellow-700 hover:bg-yellow-100">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Date & Actions */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-xs text-neutral-500">
                  <span>{formatDateTime(row.updatedAt)}</span>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex h-8 items-center gap-1 px-2.5 text-xs"
                      onClick={() => navigate(`/admin/returns/${row._id}`)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex h-8 items-center gap-1 px-2.5 text-xs"
                      onClick={() => onSelect(row)}
                      disabled={isActionDisabled}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop / Tablet Standard Table View */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={returns}
          loading={loading}
          emptyMessage="No return requests found"
        />
      </div>
    </>
  );
};

export default ReturnTable;
