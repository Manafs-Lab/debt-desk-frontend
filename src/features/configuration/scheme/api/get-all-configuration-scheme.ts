import { apiClient } from "@/lib/api-client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type TConfigurationScheme = {
	id: string;
	name: string;
	scheme_type: string;
	entry_type: string;
	description: string;
	business_id: string;
	is_deleted: boolean;
	created_at: string;
	updated_at: string;
};

type TGetAllConfigurationSchemeParams = {
	businessId: string;
	limit: number;
	skip: number;
};

type TUseGetAllConfigurationSchemeParams = {
	queryConfig?: Omit<
		UseQueryOptions<TConfigurationScheme[], Error>,
		"queryKey" | "queryFn"
	>;
	businessId: string;
	limit?: number;
	skip?: number;
};

const getAllConfigurationScheme = async ({
	businessId,
	limit,
	skip,
}: TGetAllConfigurationSchemeParams): Promise<TConfigurationScheme[]> => {
	const response = await apiClient.get<{
		data: TConfigurationScheme[];
	}>(`/configuration/scheme/business/${businessId}`, {
		params: {
			limit,
			skip,
		},
	});
	return response.data?.data as TConfigurationScheme[];
};

export const useGetAllConfigurationScheme = ({
	queryConfig = {},
	businessId,
	limit = 10,
	skip = 0,
}: TUseGetAllConfigurationSchemeParams) => {
	return useQuery({
		queryKey: ["configuration-scheme", { businessId, limit, skip }],
		queryFn: () => getAllConfigurationScheme({ businessId, limit, skip }),
		...queryConfig,
	});
};
