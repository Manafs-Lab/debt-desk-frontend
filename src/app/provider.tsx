import { queryConfig } from "@/lib/react-query";
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
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default AppProvider;
