import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  loadingComponent,
  emptyMessage = "No data found",
  rowKey = "_id",
}) => {
  if (loading) {
    return (
      loadingComponent ?? (
        <div className="rounded-lg border bg-white p-10 text-center">
          Loading...
        </div>
      )
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={column.accessor || `col-${index}`}
                className="text-xs font-semibold"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={row[rowKey]}>
                {columns.map((column, index) => (
                  <TableCell key={column.accessor || `cell-${index}`}>
                    {column.cell
                      ? column.cell(row, rowIndex)
                      : row[column.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-muted-foreground p-10 text-center"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
