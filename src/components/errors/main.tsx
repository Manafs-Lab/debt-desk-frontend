import { Box, Button, Typography } from "@mui/material";

type TMainErrorFallBack = {
	message?: string | null;
	showRefreshButton?: boolean;
};

export const MainErrorFallback = ({
	message,
	showRefreshButton,
}: TMainErrorFallBack) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100vw",
				color: "error.main",
				textAlign: "center",
			}}
			role="alert"
		>
			<Typography variant="h6" fontWeight="bold">
				{message || "Oops, something went wrong :("}
			</Typography>

			{showRefreshButton && (
				<Button
					variant="contained"
					color="primary"
					sx={{ mt: 2 }}
					onClick={() => window.location.assign(window.location.origin)}
				>
					Refresh
				</Button>
			)}
		</Box>
	);
};
