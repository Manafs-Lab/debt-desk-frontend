import DashboardTitle from "@/components/ui/dashboard-title";
import Modal from "@/components/ui/modal";
import { messages } from "@/config/constant";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useCreateConfigurationScheme } from "../api/create-configuration-scheme";
import { useSchemeFormStore } from "../scheme.store";
import ConfigurationSchemeForm from "./configuration-scheme-form";

const ConfigurationSchemeHeader = () => {
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const formRef = useRef<HTMLFormElement>(null);

	const {
		mutate: createScheme,
		isPending,
		isSuccess,
	} = useCreateConfigurationScheme({});

	const { name, schemeType, entryType, description, reset } =
		useSchemeFormStore();

	const onCreateScheme = () => {
		if (formRef.current) {
			formRef.current.requestSubmit();
			const schemeData = {
				name: name,
				scheme_type: schemeType,
				entry_type: entryType,
				description: description,
				business_id: "0f7cf6eb-6af0-47d2-953d-cb440bf4f81d",
			};
			createScheme(schemeData);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			reset();
			setOpenCreateDialog(false);
			enqueueSnackbar(messages.create.notification.success("scheme"), {
				variant: "success",
			});
		}
	}, [isSuccess, enqueueSnackbar, reset]);

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
				onAction={onCreateScheme}
				isActionPending={isPending}
				onClose={reset}
			>
				<ConfigurationSchemeForm formRef={formRef} />
			</Modal>
		</Box>
	);
};

export default ConfigurationSchemeHeader;
