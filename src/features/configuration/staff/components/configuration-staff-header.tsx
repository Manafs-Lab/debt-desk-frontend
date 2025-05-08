import DashboardTitle from "@/components/ui/dashboard-title";
import Modal from "@/components/ui/modal";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const ConfigurationStaffHeader = () => {
	const [openCreateDialog, setOpenCreateDialog] = useState(false);

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			marginBottom="1.5rem"
		>
			<DashboardTitle text="Configure Staff" />
			<Button
				variant="contained"
				color="primary"
				onClick={() => setOpenCreateDialog(true)}
			>
				Add Staff
			</Button>

			<Modal
				open={openCreateDialog}
				setOpen={setOpenCreateDialog}
				title="Create New Staff"
				actionName="Create"
				// onAction={onCreateStaff}
				// isActionPending={isPending}
				// onClose={reset}
			>
				{/* TODO: Add form here */}
			</Modal>
		</Box>
	);
};

export default ConfigurationStaffHeader;
