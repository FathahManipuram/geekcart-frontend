import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

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
         <div className="bg-white border rounded-lg p-10 text-center">
           Loading...
         </div>
       )
     );
   }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={column.accessor || `col-${index}`}
                className="font-semibold text-xs"
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
                className=" text-center p-10 text-muted-foreground"
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

export default DataTable