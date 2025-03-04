import Modal from "@/components/ui/modal";
import { messages } from "@/config/constant";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	SxProps,
	Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDeleteConfigurationScheme } from "../api/delete-configuration-scheme";
import { TConfigurationScheme } from "../api/get-all-configuration-scheme";

type TSchemeCard = {
	sx?: SxProps;
	scheme: TConfigurationScheme;
};

const SchemeCard = ({ sx, scheme }: TSchemeCard) => {
	const {
		mutate: deleteScheme,
		isPending,
		isSuccess,
	} = useDeleteConfigurationScheme();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const onDelete = () => {
		deleteScheme({ schemeId: scheme.id });
	};

	useEffect(() => {
		if (isSuccess) {
			setOpenDeleteDialog(false);
			enqueueSnackbar(messages.delete.notification.success("scheme"), {
				variant: "success",
			});
		}
	}, [isSuccess, enqueueSnackbar]);

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
				<Button
					variant="outlined"
					color="error"
					size="small"
					onClick={() => setOpenDeleteDialog(true)}
				>
					Delete
				</Button>
			</CardActions>
			<Modal
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				title="Delete Scheme"
				actionName="Delete"
				onAction={onDelete}
				actionColor="error"
				isActionPending={isPending}
			>
				<Typography>{messages.delete.confirm("scheme")}</Typography>
			</Modal>
		</Card>
	);
};

export default SchemeCard;
