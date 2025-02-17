import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useFormStore } from "../onboarding.store";

type TReviewProps = {
	step: number;
	steps: Array<string>;
	handleNext: () => void;
	handleBack: () => void;
};

const Review = ({ step, steps, handleNext, handleBack }: TReviewProps) => {
	const {
		businessName,
		businessType,
		businessAddress,
		email,
		userName,
		userPhone,
		userAddress,
	} = useFormStore();

	const {
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async () => {
		const formData = {
			businessName,
			businessType,
			businessAddress,
			email,
			userName,
			userPhone,
			userAddress,
		};

		console.log("Submitted Data:", formData); // ✅ Debugging

		try {
			const response = await fetch("https://your-api.com/onboarding", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();
			console.log("API Response:", result); // ✅ Log API response

			if (response.ok) {
				handleNext(); // Move to the next step
			} else {
				console.error("Error submitting form:", result);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<Box className="mt-5" component="form" onSubmit={handleSubmit(onSubmit)}>
			<Typography variant="h6" gutterBottom>
				Review Your Information
			</Typography>
			<Typography>Business Name: {businessName}</Typography>
			<Typography>Business Type: {businessType}</Typography>
			<Typography>Business Address: {businessAddress}</Typography>
			<Typography>Email: {email}</Typography>
			<Typography>User Name: {userName}</Typography>
			<Typography>User Phone: {userPhone}</Typography>
			<Typography>User Address: {userAddress}</Typography>

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

export default Review;
