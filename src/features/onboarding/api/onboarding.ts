import { apiClient } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

type TOnboardingData = {
	business: {
		name: string;
		type: string;
		address: string;
		email: string;
	};
	user: {
		name: string;
		phone: string;
		picture: string;
		user_address: string;
		type: string;
		flag: string;
		email: string;
		password: string;
	};
};

// API request function
export const submitOnboardingData = async (data: TOnboardingData) => {
	const response = await apiClient.post("/business/onboarding", data);
	return response.data;
};

// React Query Mutation Hook
export const useSubmitOnboarding = (config = {}) => {
	return useMutation({
		mutationFn: submitOnboardingData,
		...config,
	});
};
