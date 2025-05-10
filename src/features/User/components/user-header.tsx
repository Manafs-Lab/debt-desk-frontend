import DashboardTitle from "@/components/ui/dashboard-title";
import Modal from "@/components/ui/modal";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const UserHeader = () => {
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			marginBottom="1.5rem"
		>
			<DashboardTitle text="Users" />
			<Button
				variant="contained"
				color="primary"
				onClick={() => setOpenCreateDialog(true)}
			>
				Add User
			</Button>

			<Modal
				open={openCreateDialog}
				setOpen={setOpenCreateDialog}
				title="Create New User"
				actionName="Create"
				// onAction={onCreateUser}
				// isActionPending={isPending}
				// onClose={reset}
			>
				{/* TODO: Add form here */}
			</Modal>
		</Box>
	);
};

export default UserHeader;
