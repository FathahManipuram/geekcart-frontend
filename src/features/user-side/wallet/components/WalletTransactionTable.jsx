// WalletTransactionTable.jsx

import DataTable from "@/shared/components/DataTable";
import { Badge } from "@/shared/components/ui/badge";
import { formatDateForDisplay, formatDateTime } from "@/shared/utils/date";

const data = [
  {
    id: 1,
    date: "15 Jun 2026",
    description: "Return Refund",
    type: "CREDIT",
    amount: 500,
    balance: 2450,
  },
  {
    id: 2,
    date: "14 Jun 2026",
    description: "Order Payment",
    type: "DEBIT",
    amount: 300,
    balance: 1950,
  },
];

const WalletTransactionTable = ({ transactions, loading }) => {
  const columns = [
    {
      header: "Date",
      cell: (row) => formatDateTime(row.createdAt),
    },

    {
      header: "Reason",
      accessor: "reason",
    },

    {
      header: "Description",
      accessor: "description",
    },

    {
      header: "Type",
      cell: (row) => (
        <Badge variant={row.type === "CREDIT" ? "default" : "destructive"}>
          {row.type}
        </Badge>
      ),
    },

    {
      header: "Amount",
      cell: (row) => (
        <span
          className={
            row.type === "CREDIT"
              ? "text-green-600 font-medium"
              : "text-red-500 font-medium"
          }
        >
          {row.type === "CREDIT" ? "+" : "-"}₹{row.amount}
        </span>
      ),
    },

    {
      header: "Balance",
      cell: (row) => `₹${row.balanceAfterTransaction}`,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
      loading={loading}
      emptyMessage="No transactions found"
    />
  );
};

export default WalletTransactionTable;
