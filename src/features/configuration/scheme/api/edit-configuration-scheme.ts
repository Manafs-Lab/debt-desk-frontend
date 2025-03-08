import { apiClient } from "@/lib/api-client";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { TConfigurationScheme } from "./get-all-configuration-scheme";

export type TEditConfigurationScheme = Omit<
	Partial<TConfigurationScheme>,
	"id" | "is_deleted" | "created_at" | "updated_at"
>;

type EditConfigurationSchemeRequest = {
	schemeId: string;
	data: TEditConfigurationScheme;
};

const editConfigurationScheme = async ({
	schemeId,
	data,
}: EditConfigurationSchemeRequest): Promise<void> => {
	await apiClient.patch(`configuration/scheme/${schemeId}`, data);
};

export const useEditConfigurationScheme = ({ mutationConfig = {} }) => {
	return useMutation({
		mutationFn: editConfigurationScheme,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["configuration-scheme"] });
		},
		...mutationConfig,
	});
};
