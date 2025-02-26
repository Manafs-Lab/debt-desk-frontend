import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	SxProps,
	Typography,
} from "@mui/material";
import { TConfigurationSchema } from "../api/get-all-configuration-schema";

type TSchemeCard = {
	sx?: SxProps;
	scheme: TConfigurationSchema;
};

const SchemeCard = ({ sx, scheme }: TSchemeCard) => {
	return (
		<Card sx={{ ...sx }}>
			<CardHeader
				title={scheme.name}
				subheader={`Type: ${scheme.scheme_type}`}
				sx={{
					"& .MuiCardHeader-title": {
						fontSize: "1.25rem",
						fontWeight: 600,
					},
					"& .MuiCardHeader-subheader": {
						textTransform: "capitalize",
					},
				}}
			/>
			<CardContent sx={{ pt: 0 }}>
				<Typography color="text.primary" sx={{ mb: 2, fontSize: "0.875rem" }}>
					{scheme.description}
				</Typography>

				<Typography variant="body2" sx={{ display: "flex", mb: 1 }}>
					<strong style={{ minWidth: 100 }}>Entry Type:</strong>
					{scheme.entry_type}
				</Typography>

				<Typography variant="body2" sx={{ display: "flex", mb: 1 }}>
					<strong style={{ minWidth: 100 }}>Created:</strong>
					{new Date(scheme.created_at).toLocaleDateString()}
				</Typography>

				<Typography variant="body2" sx={{ display: "flex" }}>
					<strong style={{ minWidth: 100 }}>Updated:</strong>
					{new Date(scheme.updated_at).toLocaleDateString()}
				</Typography>
			</CardContent>

			<CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
				<Button variant="outlined" color="primary" size="small">
					Edit
				</Button>
				<Button variant="outlined" color="error" size="small">
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default SchemeCard;
