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
import { useEffect, useRef, useState } from "react";
import { useDeleteConfigurationScheme } from "../api/delete-configuration-scheme";

import { useEditConfigurationScheme } from "../api/edit-configuration-scheme";
import { TConfigurationScheme } from "../api/get-all-configuration-scheme";
import { useSchemeFormStore } from "../scheme.store";
import ConfigurationSchemeForm from "./configuration-scheme-form";

type TSchemeCard = {
	sx?: SxProps;
	scheme: TConfigurationScheme;
};

const SchemeCard = ({ sx, scheme }: TSchemeCard) => {
	const {
		mutate: deleteScheme,
		isPending: isDeletePending,
		isSuccess: isDeleteSuccess,
	} = useDeleteConfigurationScheme();

	const {
		mutate: editScheme,
		isPending: isUpdatePending,
		isSuccess: isUpdateSuccess,
	} = useEditConfigurationScheme({});

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const formRef = useRef<HTMLFormElement>(null);

	const { name, schemeType, entryType, description, setFields, reset } =
		useSchemeFormStore();

	const handleEdit = () => {
		setFields({
			name: scheme.name,
			schemeType: scheme.scheme_type.toLowerCase(),
			entryType: scheme.entry_type.toLowerCase(),
			description: scheme.description,
		});
		setOpenEditDialog(true);
	};

	const handleFormValidation = (isValid: boolean) => {
		setIsFormValid(isValid);
	};

	const onDelete = () => {
		deleteScheme({ schemeId: scheme.id });
	};

	const onEdit = () => {
		if (formRef.current) {
			formRef.current.requestSubmit();
		}
	};

	useEffect(() => {
		if (isFormValid) {
			const schemeData = {
				name: name,
				scheme_type: schemeType,
				entry_type: entryType,
				description: description,
			};
			editScheme({ schemeId: scheme.id, data: schemeData });
			setIsFormValid(false);
		}
	}, [isFormValid]);

	useEffect(() => {
		if (isDeleteSuccess) {
			setOpenDeleteDialog(false);
			enqueueSnackbar(messages.delete.notification.success("scheme"), {
				variant: "success",
			});
		}
	}, [isDeleteSuccess, enqueueSnackbar]);

	useEffect(() => {
		if (isUpdateSuccess) {
			setOpenEditDialog(false);
			reset();
			enqueueSnackbar(messages.update.notification.success("scheme"), {
				variant: "success",
			});
		}
	}, [isUpdateSuccess, enqueueSnackbar, reset]);

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
				<Button
					variant="outlined"
					color="primary"
					size="small"
					onClick={handleEdit}
				>
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
				isActionPending={isDeletePending}
			>
				<Typography>{messages.delete.confirm("scheme")}</Typography>
			</Modal>

			<Modal
				open={openEditDialog}
				setOpen={setOpenEditDialog}
				title="Edit Scheme"
				actionName="Save"
				onAction={onEdit}
				isActionPending={isUpdatePending}
				onClose={reset}
			>
				<ConfigurationSchemeForm
					formRef={formRef}
					onValidSubmit={handleFormValidation}
				/>
			</Modal>
		</Card>
	);
};

export default SchemeCard;
