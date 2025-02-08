import { queryConfig } from "@/lib/react-query";
import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

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
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default AppProvider;
