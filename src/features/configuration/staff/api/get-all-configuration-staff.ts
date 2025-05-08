import { apiClient } from "@/lib/api-client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type TConfigurationStaff = {
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

type TGetAllConfigurationStaffParams = {
	businessId: string;
	limit: number;
	skip: number;
};

type TUseGetAllConfigurationStaffParams = {
	queryConfig?: Omit<
		UseQueryOptions<TConfigurationStaff[], Error>,
		"queryKey" | "queryFn"
	>;
	businessId: string;
	limit?: number;
	skip?: number;
};

const getAllConfigurationStaff = async ({
	businessId,
	limit,
	skip,
}: TGetAllConfigurationStaffParams): Promise<TConfigurationStaff[]> => {
	const response = await apiClient.get<{
		data: TConfigurationStaff[];
	}>(`/configuration/staff/business/${businessId}`, {
		params: {
			limit,
			skip,
		},
	});
	return response.data?.data as TConfigurationStaff[];
};

export const useGetAllConfigurationStaff = ({
	queryConfig = {},
	businessId,
	limit = 10,
	skip = 0,
}: TUseGetAllConfigurationStaffParams) => {
	return useQuery({
		queryKey: ["configuration-staff", { businessId, limit, skip }],
		queryFn: () => getAllConfigurationStaff({ businessId, limit, skip }),
		...queryConfig,
	});
};
