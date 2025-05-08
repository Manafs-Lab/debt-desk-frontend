import {
	ArrowDropDown,
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
	MoreVert,
} from "@mui/icons-material";
import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
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
import React, { useMemo, useState } from "react";

interface RowAction {
	id: string;
	label: string;
	icon?: React.ReactNode;
	onClick: (row: any) => void;
	color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

interface RowActionsConfig {
	actions: RowAction[];
	displayMode?: "buttons" | "menu" | "dropdown";
	showIcons?: boolean;
	showLabels?: boolean;
	menuIcon?: React.ReactNode;
	buttonColor?:
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
}

interface BaseDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize?: number;
	showNavigation?: boolean;
	showPageSize?: boolean;
	rowActions?: RowActionsConfig;
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
	rowActions,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [localPage, setLocalPage] = useState(0);
	const [localPageSize, setLocalPageSize] = useState(pageSize);
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const [activeRow, setActiveRow] = useState<any>(null);
	const [openMenu, setOpenMenu] = useState(false);
	const [menuActions, setMenuActions] = useState<RowAction[]>([]);

	const isServerSide = Boolean(
		onPageChange && onPageSizeChange && typeof totalRows === "number",
	);

	const handleMenuClick = (
		event: React.MouseEvent<HTMLElement>,
		row: any,
		actions: RowAction[],
	) => {
		setMenuAnchorEl(event.currentTarget);
		setActiveRow(row);
		setMenuActions(actions);
		setOpenMenu(true);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
		setActiveRow(null);
		setOpenMenu(false);
	};

	const renderRowActions = (row: any) => {
		if (!rowActions) return null;

		const {
			actions,
			displayMode = "buttons",
			showIcons = true,
			showLabels = true,
			menuIcon = <MoreVert />,
			buttonColor = "primary",
		} = rowActions;

		if (displayMode === "menu") {
			return (
				<>
					<IconButton
						size="small"
						onClick={(e) => handleMenuClick(e, row, actions)}
						aria-label="row actions"
						color={buttonColor}
					>
						{menuIcon}
					</IconButton>
				</>
			);
		}

		if (displayMode === "dropdown") {
			const [firstAction, ...otherActions] = actions;
			return (
				<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
					<Button
						size="small"
						onClick={() => firstAction.onClick(row)}
						color={firstAction.color || buttonColor}
						startIcon={
							showIcons && firstAction.icon ? firstAction.icon : undefined
						}
						sx={{
							fontSize: "inherit",
							textTransform: "none",
							minWidth: "auto",
							px: 1,
							"& .MuiSvgIcon-root": {
								fontSize: "1.25rem",
							},
						}}
					>
						{showLabels && firstAction.label}
					</Button>
					{otherActions.length > 0 && (
						<>
							<IconButton
								size="small"
								onClick={(e) => handleMenuClick(e, row, otherActions)}
								color={buttonColor}
								sx={{ p: 0.5, marginLeft: -1.5 }}
							>
								<ArrowDropDown />
							</IconButton>
							<Menu
								anchorEl={menuAnchorEl}
								open={Boolean(menuAnchorEl) && activeRow?.id === row.id}
								onClose={handleMenuClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								sx={{
									"& .MuiPaper-root": {
										minWidth: 180,
									},
								}}
							></Menu>
						</>
					)}
				</Box>
			);
		}

		return (
			<Box sx={{ display: "flex", gap: 1 }}>
				{actions.map((action) => (
					<Tooltip key={action.id} title={action.label}>
						<Button
							size="small"
							onClick={() => action.onClick(row)}
							color={action.color || buttonColor}
							startIcon={showIcons && action.icon ? action.icon : undefined}
							sx={{
								fontSize: "inherit",
								textTransform: "none",
								minWidth: "auto",
								px: 1,
								"& .MuiSvgIcon-root": {
									fontSize: "1.25rem",
								},
							}}
						>
							{showLabels && action.label}
						</Button>
					</Tooltip>
				))}
			</Box>
		);
	};

	const tableColumns = useMemo(() => {
		if (!rowActions) return columns;

		return [
			...columns,
			{
				id: "actions",
				header: "Actions",
				cell: ({ row }) => renderRowActions(row.original),
			},
		];
	}, [columns, rowActions]);

	const table = useReactTable({
		data,
		columns: tableColumns,
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

			<Menu
				anchorEl={menuAnchorEl}
				open={Boolean(menuAnchorEl) && openMenu}
				onClose={handleMenuClose}
				sx={{
					"& .MuiPaper-root": {
						minWidth: 180,
					},
				}}
			>
				{menuActions.map((action) => {
					const color = action.color || rowActions?.buttonColor;
					return (
						<MenuItem
							key={action.id}
							onClick={() => {
								action.onClick(activeRow);
								handleMenuClose();
							}}
							sx={{
								color: `${color}.main`,
								"&:hover": {
									backgroundColor: `${color}.lighter`,
								},
							}}
						>
							{rowActions?.showIcons && action.icon && (
								<Box
									component="span"
									sx={{
										mr: 1,
										display: "flex",
										alignItems: "center",
										color: "inherit",
									}}
								>
									{React.cloneElement(action.icon as React.ReactElement, {
										sx: { color: "inherit" },
									})}
								</Box>
							)}
							<Box component="span" sx={{ color: "inherit" }}>
								{rowActions?.showLabels && action.label}
							</Box>
						</MenuItem>
					);
				})}
			</Menu>
		</Paper>
	);
}

export default DataTable;
