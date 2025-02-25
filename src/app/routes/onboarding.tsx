import { MainErrorFallback as ErrorPage } from "@/components/errors/main";
import PublicLayout from "@/components/layouts/public-layout";
import OnboardingMultiStepForm from "@/features/onboarding/components/onboarding-form";
import { Box, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const OnboardingForm = () => {
	const [errorShown, setErrorShown] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Extract hash fragment from URL
		const hashParams = new URLSearchParams(
			window.location.href.split("#")[1] || "",
		);
		const accessToken = hashParams.get("access_token");
		const error = hashParams.get("error");
		const errorDescription = hashParams.get("error_description");
		setErrorMessage(errorDescription || null);

		if (accessToken) {
			Cookies.set("accessToken", accessToken);
		} else if (error && !errorShown) {
			enqueueSnackbar(`${errorDescription || "No Access Token Found in URL"}`, {
				variant: "error",
			});
			setErrorShown(true);
		}

		setIsLoading(false);
	}, [window.location.href]);

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<PublicLayout>
			<div className="d-flex justify-content-center align-items-center h-100">
				{errorShown ? (
					<ErrorPage message={errorMessage} />
				) : (
					<OnboardingMultiStepForm />
				)}
			</div>
		</PublicLayout>
	);
};

export default OnboardingForm;
