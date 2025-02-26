import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
} from "@mui/icons-material";
import {
	Box,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface BaseDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize?: number;
	showNavigation?: boolean;
	showPageSize?: boolean;
}

interface ServerSideProps {
	totalRows: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (pageSize: number) => void;
	isLoading?: boolean;
}

type DataTableProps<TData, TValue> = BaseDataTableProps<TData, TValue> &
	Partial<ServerSideProps>;

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		newPage: number,
	) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const { count, page, rowsPerPage, onPageChange } = props;

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={(event) => onPageChange(event, 0)}
				disabled={page === 0}
				aria-label="first page"
			>
				<FirstPage />
			</IconButton>
			<IconButton
				onClick={(event) => onPageChange(event, page - 1)}
				disabled={page === 0}
				aria-label="previous page"
			>
				<KeyboardArrowLeft />
			</IconButton>
			<IconButton
				onClick={(event) => onPageChange(event, page + 1)}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				<KeyboardArrowRight />
			</IconButton>
			<IconButton
				onClick={(event) =>
					onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
				}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				<LastPage />
			</IconButton>
		</Box>
	);
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageSize = 10,
	showNavigation = true,
	showPageSize = true,
	totalRows,
	currentPage,
	onPageChange,
	onPageSizeChange,
	isLoading = false,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [localPage, setLocalPage] = useState(0);
	const [localPageSize, setLocalPageSize] = useState(pageSize);

	const isServerSide = Boolean(
		onPageChange && onPageSizeChange && typeof totalRows === "number",
	);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: isServerSide ? undefined : getPaginationRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
			pagination: {
				pageIndex: isServerSide ? (currentPage ?? 0) : localPage,
				pageSize: isServerSide ? pageSize : localPageSize,
			},
		},
		manualPagination: isServerSide,
		pageCount: isServerSide
			? Math.ceil((totalRows ?? 0) / pageSize)
			: undefined,
	});

	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		if (isServerSide) {
			onPageChange?.(newPage);
		} else {
			setLocalPage(newPage);
			table.setPageIndex(newPage);
		}
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const newPageSize = parseInt(event.target.value, 10);
		if (isServerSide) {
			onPageSizeChange?.(newPageSize);
			onPageChange?.(0);
		} else {
			setLocalPageSize(newPageSize);
			setLocalPage(0);
			table.setPageSize(newPageSize);
		}
	};

	return (
		<Paper sx={{ width: "100%", mb: 2 }}>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-label="data table">
					<TableHead>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableCell key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									sx={{ height: "300px", textAlign: "center" }}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											flexDirection: "column",
											gap: 2,
										}}
									>
										<CircularProgress />
										<Typography variant="body2" color="text.secondary">
											Loading data...
										</Typography>
									</Box>
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									align="center"
									sx={{ py: 3 }}
								>
									<Typography variant="body1" color="text.secondary">
										No results found
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{showNavigation && (
				<TablePagination
					rowsPerPageOptions={showPageSize ? [5, 10, 25, 50] : [pageSize]}
					component="div"
					count={isServerSide ? (totalRows ?? 0) : data.length}
					rowsPerPage={isServerSide ? pageSize : localPageSize}
					page={isServerSide ? (currentPage ?? 0) : localPage}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			)}
		</Paper>
	);
}

export default DataTable;
