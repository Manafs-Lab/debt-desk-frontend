import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useLocation } from "wouter";

const GlobalErrorHandler = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [, setLocation] = useLocation();

	useEffect(() => {
		const handleGlobalError: OnErrorEventHandler = (
			event,
			source,
			lineno,
			colno,
			error,
		) => {
			console.error(
				"Caught by window.onerror:",
				event,
				source,
				lineno,
				colno,
				error,
			);
			enqueueSnackbar(error?.message || "Unknown error", {
				variant: "error",
			});
		};

		const handlePromiseRejection = (event: PromiseRejectionEvent) => {
			console.error("Unhandled Promise Rejection:", event.reason);
			enqueueSnackbar(event.reason?.message || "Something went wrong", {
				variant: "error",
			});
			if (event.reason?.redirect) {
				setLocation(event.reason.redirect);
			}
			event.preventDefault();
		};

		window.onerror = handleGlobalError;
		window.addEventListener("unhandledrejection", handlePromiseRejection);

		return () => {
			window.removeEventListener("unhandledrejection", handlePromiseRejection);
		};
	}, [enqueueSnackbar]);

	return null;
};

export default GlobalErrorHandler;
