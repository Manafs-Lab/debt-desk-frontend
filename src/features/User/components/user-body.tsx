import DataTable from "@/components/ui/data-table";
import Modal from "@/components/ui/modal";
import { messages } from "@/config/constant";
import { Delete, Edit } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDeleteUser } from "../api/delete-user";
import { TUser, useGetAllUser } from "../api/get-all-user";

const columns: ColumnDef<TUser>[] = [
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
		accessorKey: "user_address",
		header: "Address",
	},
	{
		accessorKey: "is_address_verified",
		header: "Address Verified",
	},
	{
		accessorKey: "membership_no",
		header: "Membership No",
	},
	{
		accessorKey: "flag",
		header: "Flag",
	},
];

const UserBody = () => {
	const { data, isLoading } = useGetAllUser({
		businessId: "8bccfe28-1829-4a01-9bfa-56ee24d209a2",
		limit: 10,
		skip: 0,
	});

	const {
		mutate: deleteUser,
		isPending: isDeletePending,
		isSuccess: isDeleteSuccess,
	} = useDeleteUser();

	const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleDelete = (data: TUser) => {
		setSelectedUser(data);
		setOpenDeleteDialog(true);
	};

	const onDelete = () => {
		if (selectedUser) {
			deleteUser({ userId: selectedUser.id });
		}
	};

	useEffect(() => {
		if (isDeleteSuccess) {
			setOpenDeleteDialog(false);
			setSelectedUser(null);
			enqueueSnackbar(messages.delete.notification.success("user"), {
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
							onClick: (data: TUser) => {
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
				title="Delete User"
				actionName="Delete"
				onAction={onDelete}
				actionColor="error"
				isActionPending={isDeletePending}
			>
				<Typography>{messages.delete.confirm("user")}</Typography>
			</Modal>
		</>
	);
};

export default UserBody;
