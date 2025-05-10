import { apiClient } from "@/lib/api-client";
import { queryClient } from "@/lib/react-query";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type TDeleteUser = {
	userId: string;
};

type TUseDeleteUserParams = {
	mutationConfig?: Omit<
		UseMutationOptions<void, Error, TDeleteUser>,
		"mutationFn"
	>;
};

const deleteUser = async ({ userId }: TDeleteUser): Promise<void> => {
	await apiClient.delete(`/user/${userId}`);
};

export const useDeleteUser = ({
	mutationConfig,
}: TUseDeleteUserParams = {}) => {
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		...mutationConfig,
	});
};
