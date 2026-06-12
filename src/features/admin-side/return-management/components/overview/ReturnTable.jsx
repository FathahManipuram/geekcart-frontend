import DataTable from '@/shared/components/DataTable';
import React from 'react'
import ReturnStatusBadge from './ReturnStatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '@/shared/utils/date';
import { ITEM_STATUSES } from '@/shared/constants/order/orderStatus';

const ReturnTable = ({returns, loading, onSelect}) => {
  const navigate= useNavigate()

  const columns = [
    {
      header: "Order Details",

      cell: (row) => (
        <div className="flex gap-3">
          <img
            src={row.itemSnapshot?.image}
            alt={row.itemSnapshot?.name}
            className="w-14 h-14 rounded object-cover"
          />

          <div className="text-wrap sm:pr-15">
            <p className="font-medium">#{row.order?.orderNumber}</p>
            <p className="text-sm text-muted-foreground">
              {row.itemSnapshot?.name}
            </p>
            <div className="flex text-xs gap-2">
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
            <p className="text-sm text-muted-foreground">{row.user?.email}</p>
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
      header: "Amount",
      accessor: "amount",

      cell: (row) => <span>₹{row.refundAmount}</span>,
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
            <Eye className="w-4 h-4" />
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
            <Pencil className="w-4 h-4" />
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
}

export default ReturnTable
