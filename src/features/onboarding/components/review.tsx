import { LOGIN_ROUTE } from "@/config/constant";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useSubmitOnboarding } from "../api/onboarding";
import { useFormStore } from "../onboarding.store";

type TReviewProps = {
	step: number;
	steps: Array<string>;
	handleNext: () => void;
	handleBack: () => void;
};

const Review = ({ step, steps, handleBack }: TReviewProps) => {
	const [, setLocation] = useLocation();
	const {
		businessName,
		businessType,
		businessAddress,
		email,
		userName,
		userPhone,
		userAddress,
		password,
	} = useFormStore();

	const { handleSubmit } = useForm();

	const mutation = useSubmitOnboarding({
		onSuccess: (data: any) => {
			setLocation(LOGIN_ROUTE);
		},
		onError: (error: any) => {
			console.error("API Error:", error);
		},
	});

	const onSubmit = async () => {
		const formData = {
			business: {
				name: businessName,
				type: businessType,
				address: businessAddress,
				email: email,
			},
			user: {
				name: userName,
				phone: userPhone,
				picture: "https://shorturl.at/MCbaE",
				user_address: userAddress,
				type: "VENDOR",
				flag: "REGULAR",
				email: email,
				password: password,
			},
		};

		mutation.mutate(formData);
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
