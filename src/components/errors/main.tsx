import { Box, Button, Typography } from "@mui/material";

type TMainErrorFallBack = {
	message?: string | null;
	showRefreshButton?: boolean;
	showHomeButton?: boolean;
};

export const MainErrorFallback = () => {
	return <MainErrorComponent />;
};

export const MainErrorComponent = ({
	message = null,
	showRefreshButton = true,
	showHomeButton = true,
}: TMainErrorFallBack) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "87vh",
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
					color="secondary"
					sx={{ mt: 2 }}
					onClick={() => window.location.reload()}
				>
					Refresh
				</Button>
			)}

			{showHomeButton && (
				<Button
					variant="contained"
					color="primary"
					sx={{ mt: 2 }}
					onClick={() => window.location.assign(window.location.origin)}
				>
					Return to Homepage
				</Button>
			)}
		</Box>
	);
};
