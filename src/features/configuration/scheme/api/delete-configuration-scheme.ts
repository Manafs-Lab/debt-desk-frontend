import { apiClient } from "@/lib/api-client";
import { queryClient } from "@/lib/react-query";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type TDeleteConfigurationSchemeParams = {
	schemeId: string;
};

type TUseDeleteConfigurationSchemeParams = {
	mutationConfig?: Omit<
		UseMutationOptions<void, Error, TDeleteConfigurationSchemeParams>,
		"mutationFn"
	>;
};

const deleteConfigurationScheme = async ({
	schemeId,
}: TDeleteConfigurationSchemeParams): Promise<void> => {
	await apiClient.delete(`/configuration/scheme/${schemeId}`);
};

export const useDeleteConfigurationScheme = ({
	mutationConfig = {},
}: TUseDeleteConfigurationSchemeParams = {}) => {
	return useMutation({
		mutationFn: deleteConfigurationScheme,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["configuration-scheme"] });
		},
		...mutationConfig,
	});
};
