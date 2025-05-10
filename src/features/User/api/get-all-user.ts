import { apiClient } from "@/lib/api-client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type TUser = {
	id: string;
	supabase_id: string;
	membership_no: string | null;
	name: string;
	phone: string;
	picture: string;
	user_address: string;
	is_address_verified: boolean;
	type: string;
	flag: string;
	email: string;
	created_at: string;
	updated_at: string;
	is_deleted: boolean;
};

type TGetAllUserParams = {
	businessId: string;
	limit: number;
	skip: number;
};

type TUseGetAllUserParams = {
	queryConfig?: Omit<UseQueryOptions<TUser[], Error>, "queryKey" | "queryFn">;
	businessId: string;
	limit?: number;
	skip?: number;
};

const getAllUser = async ({
	businessId,
	limit,
	skip,
}: TGetAllUserParams): Promise<TUser[]> => {
	const response = await apiClient.get<{
		data: TUser[];
	}>(`/user/business/${businessId}`, {
		params: {
			limit,
			skip,
		},
	});
	return response.data?.data as TUser[];
};

export const useGetAllUser = ({
	queryConfig = {},
	businessId,
	limit = 10,
	skip = 0,
}: TUseGetAllUserParams) => {
	return useQuery({
		queryKey: ["users", { businessId, limit, skip }],
		queryFn: () => getAllUser({ businessId, limit, skip }),
		...queryConfig,
	});
};
