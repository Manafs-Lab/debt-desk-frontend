import { schemeOptions } from "@/config/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSchemeFormStore } from "../scheme.store";

const SchemeCreateSchema = z.object({
	name: z
		.string()
		.min(3, "Scheme name should be at least three characters long"),
	schemeType: z.string().min(1, "Invalid scheme type"),
	entryType: z.string().min(1, "Invalid entry type"),
	description: z.string().optional(),
});

export type TCreateSchemeData = z.infer<typeof SchemeCreateSchema>;

type TConfigurationSchemeProps = {
	formRef: RefObject<HTMLFormElement>;
	onValidSubmit: (isValid: boolean) => void;
};

const ConfigurationSchemeForm = ({
	formRef,
	onValidSubmit,
}: TConfigurationSchemeProps) => {
	const { setFields, name, schemeType, entryType, description } =
		useSchemeFormStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TCreateSchemeData>({
		resolver: zodResolver(SchemeCreateSchema),
		defaultValues: {
			name: name || "",
			schemeType: schemeType || "",
			entryType: entryType || "",
			description: description || "",
		},
		mode: "onChange",
	});

	const onSubmit = (data: TCreateSchemeData) => {
		setFields({
			name: data.name,
			schemeType: data.schemeType,
			entryType: data.entryType,
			description: data.description,
		});
		onValidSubmit(true);
	};

	const onError = () => {
		onValidSubmit(false);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				minWidth: 400,
				pt: 2,
			}}
			component="form"
			onSubmit={handleSubmit(onSubmit, onError)}
			ref={formRef}
			noValidate
		>
			<TextField
				fullWidth
				label="Scheme Name"
				error={!!errors.name}
				helperText={errors.name?.message}
				{...register("name")}
				required
			/>

			<FormControl fullWidth error={!!errors.schemeType} required>
				<InputLabel id="scheme-type-label">Scheme Type</InputLabel>
				<Select
					id="scheme-type"
					label="Scheme Type"
					labelId="scheme-type-label"
					defaultValue={schemeType}
					{...register("schemeType")}
				>
					{schemeOptions.schemeTypes.map(({ value, label }) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</Select>
				{errors.schemeType && (
					<FormHelperText>{errors.schemeType.message}</FormHelperText>
				)}
			</FormControl>

			<FormControl fullWidth error={!!errors.entryType} required>
				<InputLabel id="entry-type-label">Entry Type</InputLabel>
				<Select
					id="entry-type"
					label="Entry Type"
					labelId="entry-type-label"
					defaultValue={entryType}
					{...register("entryType")}
				>
					{schemeOptions.entryTypes.map(({ value, label }) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
				</Select>
				{errors.entryType && (
					<FormHelperText>{errors.entryType.message}</FormHelperText>
				)}
			</FormControl>

			<TextField
				{...register("description")}
				fullWidth
				label="Description"
				multiline
				rows={3}
			/>
		</Box>
	);
};

export default ConfigurationSchemeForm;
