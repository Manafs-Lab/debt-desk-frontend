import GlobalErrorHandler from "@/components/errors/global-error-handler";
import { MainErrorFallback } from "@/components/errors/main";
import { queryConfig } from "@/lib/react-query";
import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface IAppProvider {
	children: React.ReactNode;
}

const AppProvider = ({ children }: IAppProvider) => {
	const [queryClient] = useState(
		() => new QueryClient({ defaultOptions: queryConfig }),
	);
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SnackbarProvider autoHideDuration={3000}>
					<ErrorBoundary FallbackComponent={MainErrorFallback}>
						<GlobalErrorHandler />
						{children}
					</ErrorBoundary>
				</SnackbarProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default AppProvider;
