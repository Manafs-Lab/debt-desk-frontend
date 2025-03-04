import DashboardTitle from "@/components/ui/dashboard-title";
import { Box, Button } from "@mui/material";

const ConfigurationSchemeHeader = () => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			marginBottom="1.5rem"
		>
			<DashboardTitle text="Configure Scheme" />
			<Button variant="contained" color="primary">
				Add Scheme
			</Button>
		</Box>
	);
};

export default ConfigurationSchemeHeader;
