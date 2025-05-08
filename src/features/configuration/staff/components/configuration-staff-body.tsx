import { DataTable } from "@/components/ui/data-table";
import Modal from "@/components/ui/modal";
import { messages } from "@/config/constant";
import { Delete, Edit } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDeleteConfigurationStaff } from "../api/delete-configuration-staff";
import {
	TConfigurationStaff,
	useGetAllConfigurationStaff,
} from "../api/get-all-configuration-staff";

const columns: ColumnDef<TConfigurationStaff>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "flag",
		header: "Flag",
	},
];

const ConfigurationStaffBody = () => {
	const { data, isLoading } = useGetAllConfigurationStaff({
		businessId: "65925a8d-4c08-4745-a428-6446be2ffbd6",
		limit: 10,
		skip: 0,
	});

	const {
		mutate: deleteStaff,
		isPending: isDeletePending,
		isSuccess: isDeleteSuccess,
	} = useDeleteConfigurationStaff();
	const [selectedStaff, setSelectedStaff] =
		useState<TConfigurationStaff | null>(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleDelete = (data: any) => {
		setSelectedStaff(data);
		setOpenDeleteDialog(true);
	};

	const onDelete = () => {
		if (selectedStaff) {
			deleteStaff({ staffId: selectedStaff.id });
		}
	};

	useEffect(() => {
		if (isDeleteSuccess) {
			setOpenDeleteDialog(false);
			setSelectedStaff(null);
			enqueueSnackbar(messages.delete.notification.success("staff"), {
				variant: "success",
			});
		}
	}, [isDeleteSuccess, enqueueSnackbar]);

	return (
		<>
			<DataTable
				columns={columns}
				data={data ?? []}
				pageSize={10}
				isLoading={isLoading}
				rowActions={{
					actions: [
						{
							id: "edit",
							label: "Edit",
							icon: <Edit />,
							onClick: (data: any) => {
								console.log("data", data);
							},
							color: "primary",
						},
						{
							id: "delete",
							label: "Delete",
							icon: <Delete />,
							onClick: (data: any) => {
								handleDelete(data);
							},
							color: "error",
						},
					],
					displayMode: "buttons",
					showLabels: true,
					showIcons: true,
				}}
			/>
			<Modal
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				title="Delete Staff"
				actionName="Delete"
				onAction={onDelete}
				actionColor="error"
				isActionPending={isDeletePending}
			>
				<Typography>{messages.delete.confirm("staff")}</Typography>
			</Modal>
		</>
	);
};

export default ConfigurationStaffBody;
