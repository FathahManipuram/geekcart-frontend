import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const DataTable= ({
	columns=[],
	data=[],
	loading= false,
	emptyMessage= "No data found"
})=>{

if(loading){
	return (
		<div className="bg-white border rounded-lg p-10 text-center">
			Loading...
		</div>
	)
}

return (
	<div className="bg-white border rounded-lg overflow-hidden">

		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((column, index)=>(
						<TableHead key={column.accessor || `col-${index}`} className="font-semibold text-xs">
							{column.header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>

			<TableBody>
				{data.length > 0 ? (
					data.map((row)=>(
						<TableRow key={row._id}>
							{columns.map((column, index)=>(
								<TableCell key={column.accessor || `cell-${index}`}>
									{column.cell ? column.cell(row)
									: row [column.accessor]}
								</TableCell>
							))}
						</TableRow>
					))
				): (
					<TableRow>
						<TableCell col-span={columns.length} className=" text center p-10 text-muted-foreground">
							{emptyMessage}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>

	</div>
)
}

export default DataTable