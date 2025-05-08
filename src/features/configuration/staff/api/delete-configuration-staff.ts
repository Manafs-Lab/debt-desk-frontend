import { apiClient } from "@/lib/api-client";
import { queryClient } from "@/lib/react-query";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type TDeleteConfigurationStaffParams = {
	staffId: string;
};

type TUseDeleteConfigurationStaffParams = {
	mutationConfig?: Omit<
		UseMutationOptions<void, Error, TDeleteConfigurationStaffParams>,
		"mutationFn"
	>;
};

const deleteConfigurationStaff = async ({
	staffId,
}: TDeleteConfigurationStaffParams): Promise<void> => {
	await apiClient.delete(`/configuration/staff/${staffId}`);
};

export const useDeleteConfigurationStaff = ({
	mutationConfig = {},
}: TUseDeleteConfigurationStaffParams = {}) => {
	return useMutation({
		mutationFn: deleteConfigurationStaff,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["configuration-staff"] });
		},
		...mutationConfig,
	});
};
