import { Box, Button, Typography } from "@mui/material";

export const MainErrorFallback = () => {
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
				Oops, something went wrong :(
			</Typography>
			<Button
				variant="contained"
				color="primary"
				sx={{ mt: 2 }}
				onClick={() => window.location.assign(window.location.origin)}
			>
				Refresh
			</Button>
		</Box>
	);
};
