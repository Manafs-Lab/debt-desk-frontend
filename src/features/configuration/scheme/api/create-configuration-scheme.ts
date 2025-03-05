import { apiClient } from "@/lib/api-client";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TConfigurationScheme } from "./get-all-configuration-scheme";

export type TCreateConfigurationScheme = Omit<
	TConfigurationScheme,
	"id" | "is_deleted" | "created_at" | "updated_at"
> & {
	description?: string;
};

const createConfigurationScheme = async (
	data: TCreateConfigurationScheme,
): Promise<void> => {
	await apiClient.post(`configuration/scheme`, data);
};

export const useCreateConfigurationScheme = ({ mutationConfig = {} }) => {
	return useMutation({
		mutationFn: createConfigurationScheme,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["configuration-scheme"] });
		},
		...mutationConfig,
	});
};
