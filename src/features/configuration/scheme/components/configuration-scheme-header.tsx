import DashboardTitle from "@/components/ui/dashboard-title";
import Modal from "@/components/ui/modal";
import { messages, schemeOptions } from "@/config/constant";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	TCreateConfigurationScheme,
	useCreateConfigurationScheme,
} from "../api/create-configuration-scheme";

const ConfigurationSchemeHeader = () => {
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const { control, handleSubmit, reset } =
		useForm<TCreateConfigurationScheme>();
	const {
		mutate: createScheme,
		isPending,
		isSuccess,
	} = useCreateConfigurationScheme({});

	const onCreateScheme = (data: TCreateConfigurationScheme) => {
		const schemeData = {
			...data,
			business_id: "0f7cf6eb-6af0-47d2-953d-cb440bf4f81d",
		};
		createScheme(schemeData);
	};

	useEffect(() => {
		if (isSuccess) {
			setOpenCreateDialog(false);
			enqueueSnackbar(messages.create.notification.success("scheme"), {
				variant: "success",
			});
		}
	}, [isSuccess, enqueueSnackbar]);

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			marginBottom="1.5rem"
		>
			<DashboardTitle text="Configure Scheme" />
			<Button
				variant="contained"
				color="primary"
				onClick={() => setOpenCreateDialog(true)}
			>
				Add Scheme
			</Button>

			<Modal
				open={openCreateDialog}
				setOpen={setOpenCreateDialog}
				title="Create New Scheme"
				actionName="Create"
				onAction={handleSubmit(onCreateScheme)}
				isActionPending={isPending}
				onClose={() => reset()}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						minWidth: 400,
						pt: 2,
					}}
				>
					<Controller
						name="name"
						control={control}
						rules={{ required: "Scheme name is required" }}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								fullWidth
								label="Scheme Name"
								error={!!error}
								helperText={error?.message}
								required
							/>
						)}
					/>

					<Controller
						name="scheme_type"
						control={control}
						rules={{ required: "Scheme type is required" }}
						render={({ field, fieldState: { error } }) => (
							<FormControl fullWidth error={!!error} required>
								<InputLabel>Scheme Type</InputLabel>
								<Select {...field} label="Scheme Type">
									{schemeOptions.schemeTypes.map(({ value, label }) => (
										<MenuItem key={value} value={value}>
											{label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					/>

					<Controller
						name="entry_type"
						control={control}
						rules={{ required: "Entry type is required" }}
						render={({ field, fieldState: { error } }) => (
							<FormControl fullWidth error={!!error} required>
								<InputLabel>Entry Type</InputLabel>
								<Select {...field} label="Entry Type">
									{schemeOptions.entryTypes.map(({ value, label }) => (
										<MenuItem key={value} value={value}>
											{label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					/>

					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								label="Description"
								multiline
								rows={3}
							/>
						)}
					/>
				</Box>
			</Modal>
		</Box>
	);
};

export default ConfigurationSchemeHeader;
