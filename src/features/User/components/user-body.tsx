import DataTable from "@/components/ui/data-table";
import { Delete, Edit } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
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
								console.log("User Data", data);
							},
							color: "error",
						},
					],
					displayMode: "buttons",
					showLabels: true,
					showIcons: true,
				}}
			/>
		</>
	);
};

export default UserBody;
