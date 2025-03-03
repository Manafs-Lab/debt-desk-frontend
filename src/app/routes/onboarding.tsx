import { MainErrorComponent as ErrorPage } from "@/components/errors/main";
import PublicLayout from "@/components/layouts/public-layout";
import OnboardingMultiStepForm from "@/features/onboarding/components/onboarding-form";
import { Box, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const OnboardingForm = () => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [errorShown, setErrorShown] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const hashParams = new URLSearchParams(
			window.location.href.split("#")[1] || "",
		);
		const accessToken = hashParams.get("access_token");
		const error = hashParams.get("error");
		const errorDescription = hashParams.get("error_description");
		setErrorMessage(errorDescription || null);

		if (accessToken) {
			setAccessToken(accessToken);
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

	if (!accessToken) {
		return (
			<ErrorPage message="Access Denied: You are not authorized to view this page." />
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
