import { SxProps, Typography } from "@mui/material";

type TDashboardTitle = {
	text: string;
	sx?: SxProps;
};
const DashboardTitle = ({ text, sx }: TDashboardTitle) => {
	return (
		<Typography
			variant="h5"
			color="text.primary"
			sx={{ fontWeight: "bold", ...sx }}
		>
			{text}
		</Typography>
	);
};

export default DashboardTitle;
