import { Box, Button, Typography } from "@mui/material";
import { Link } from "wouter";

const NotFoundRoute = () => {
	return (
		<Box
			sx={{
				mt: 13,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
				fontWeight: "bold",
			}}
		>
			<Typography variant="h4" gutterBottom>
				404 - Not Found
			</Typography>
			<Typography variant="body1" sx={{ mb: 2 }}>
				Sorry, the page you are looking for does not exist.
			</Typography>
			<Link href="/">
				<Button variant="contained">Go to Home</Button>
			</Link>
		</Box>
	);
};

export default NotFoundRoute;
