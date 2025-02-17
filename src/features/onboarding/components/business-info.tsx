import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormStore } from "../onboarding.store";

const BusinessOnboardingSchema = z.object({
	businessName: z.string().min(3, "Invalid Business Name"),
	businessType: z.string().min(1, "Invalid Business Type"),
	email: z.string().email("Invalid Email Format"),
	businessAddress: z.string().min(5, "Invalid Business Address"),
});

export type TBusinessOnboardingData = z.infer<typeof BusinessOnboardingSchema>;

type TBusinessInfoProps = {
	step: number;
	steps: Array<string>;
	handleNext: () => void;
	handleBack: () => void;
};

const BusinessInfo = ({
	step,
	steps,
	handleNext,
	handleBack,
}: TBusinessInfoProps) => {
	const { setField, businessName, businessType, email, businessAddress } =
		useFormStore();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TBusinessOnboardingData>({
		resolver: zodResolver(BusinessOnboardingSchema),
		defaultValues: {
			businessName: businessName || "",
			businessType: businessType || "",
			email: email || "",
			businessAddress: businessAddress || "",
		},
	});

	const onSubmit = (data: TBusinessOnboardingData) => {
		console.log("Submitted Data:", data);
		setField("businessName", data.businessName);
		setField("businessType", data.businessType);
		setField("email", data.email);
		setField("businessAddress", data.businessAddress);
		handleNext();
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)}>
			<TextField
				fullWidth
				label="Business Name"
				margin="normal"
				required
				error={!!errors.name}
				helperText={errors.name?.message}
				{...register("businessName")}
			/>
			<FormControl fullWidth margin="normal" required>
				<InputLabel id="business-type-label">Business Type</InputLabel>
				<Select
					labelId="business-type-label"
					id="business-type"
					defaultValue=""
					label="Business Type"
					{...register("businessType")}
				>
					<MenuItem value="NGO">NGO</MenuItem>
					<MenuItem value="OTHER">Other</MenuItem>
				</Select>
			</FormControl>
			<TextField
				fullWidth
				label="Email"
				type="email"
				margin="normal"
				required
				error={!!errors.email}
				helperText={errors.email?.message}
				{...register("email")}
			/>
			<TextField
				fullWidth
				label="Address"
				margin="normal"
				required
				error={!!errors.businessAddress}
				helperText={errors.businessAddress?.message}
				{...register("businessAddress")}
			/>

			<Box sx={{ mt: 4 }}>
				<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
					{step > 1 && (
						<Button type="button" onClick={handleBack} sx={{ mr: 1 }}>
							Back
						</Button>
					)}
					<Button type="submit" variant="contained">
						{step === steps.length ? "Submit" : "Next"}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default BusinessInfo;
