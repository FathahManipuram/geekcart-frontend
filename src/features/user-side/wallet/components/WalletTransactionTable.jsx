import DataTable from "@/shared/components/DataTable";
import { Badge } from "@/shared/components/ui/badge";
import { formatDateTime } from "@/shared/utils/date";

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
              ? "font-medium text-green-600"
              : "font-medium text-red-500"
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
