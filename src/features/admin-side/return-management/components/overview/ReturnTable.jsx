import DataTable from '@/shared/components/DataTable';
import React from 'react'
import ReturnStatusBadge from './ReturnStatusBadge';
import { Button } from '@/shared/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReturnTable = ({returns, loading}) => {
  const navigate= useNavigate()

  const columns = [
    {
      header: "Order Details",

      cell: (row) => (
        <div className="flex gap-3">
          <img
            src={row.image}
            alt={row.itemName}
            className="w-14 h-14 rounded object-cover"
          />

          <div>
            <p className="font-medium">#{row.order?.orderNumber}</p>

            <p className="text-sm text-muted-foreground">{row.order?.itemName}</p>
          </div>
        </div>
      ),
    },

    {
      header: "Customer",
      accessor: "customerName",
      cell: (row)=> (
        <>
        <div>
            <p className="font-medium">{row?.user?.fullName}</p>

            <p className="text-sm text-muted-foreground">{row.user?.email}</p>
          </div>
        </>
      )
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

      cell: (row) => new Date(row.requestedAt).toLocaleDateString(),
    },
    {
      header: "ACTIONS",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => navigate(`/admin/retrns/${row._id}`)}>
            <Eye className="w-4 h-4" />
          </Button>

          <Button size="icon" variant="ghost" onClick={() => onEdit(row)}>
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
