import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import type React from "react";
import { useRef } from "react";
import { useFormStore } from "../onboarding.store";
import BusinessInfo from "./business-info";
import Review from "./review";
import UserInfo from "./user-info";

const steps = ["Business Information", "User Information", "Review & Submit"];

const BusinessOnboardingForm: React.FC = () => {
	const { step, nextStep, prevStep, reset } = useFormStore();
	const businessInfoRef = useRef<() => void>(null!);

	const handleNext = () => {
		if (step === 1 && businessInfoRef.current) {
			businessInfoRef.current();
			// Form submission logic here
			console.log("Form submitted!");
			return;
		}

		if (step === steps.length) {
			console.log("Form submitted!");
			reset();
		} else {
			nextStep();
		}
	};

	const handleBack = () => {
		prevStep();
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 1:
				return (
					<BusinessInfo
						step={step}
						steps={steps}
						handleNext={handleNext}
						handleBack={handleBack}
					/>
				);
			case 2:
				return (
					<UserInfo
						step={step}
						steps={steps}
						handleNext={handleNext}
						handleBack={handleBack}
					/>
				);
			case 3:
				return (
					<Review
						step={step}
						steps={steps}
						handleNext={handleNext}
						handleBack={handleBack}
					/>
				);
			default:
				return "Unknown step";
		}
	};

	return (
		<Card
			variant="outlined"
			sx={{ minWidth: 275, maxWidth: 800, margin: "auto", mt: 6, p: 5 }}
		>
			<CardContent>
				<Typography
					sx={{ textAlign: "center", mb: 5 }}
					variant="h3"
					gutterBottom
				>
					Business Onboarding
				</Typography>
				<Divider sx={{ mb: 7 }} />
				<Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4 }}>
					<Stepper activeStep={step - 1} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{getStepContent(step)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default BusinessOnboardingForm;
