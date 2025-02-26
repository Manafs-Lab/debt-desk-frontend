import { apiClient } from "@/lib/api-client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";

export type TConfigurationSchema = {
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

type TGetAllConfigurationSchemaParams = {
	businessId: string;
	limit: number;
	skip: number;
};

type TUseGetAllConfigurationSchemaParams = {
	queryConfig?: Omit<
		UseQueryOptions<TConfigurationSchema[], Error>,
		"queryKey" | "queryFn"
	>;
	businessId: string;
	limit?: number;
	skip?: number;
};

const getAllConfigurationSchema = async ({
	businessId,
	limit,
	skip,
}: TGetAllConfigurationSchemaParams): Promise<TConfigurationSchema[]> => {
	const response = await apiClient.get<{
		data: TConfigurationSchema[];
	}>(`/configuration/scheme/business/${businessId}`, {
		params: {
			limit,
			skip,
		},
	});
	return response.data?.data as TConfigurationSchema[];
};

const getAllConfigurationSchemaOptions = (
	businessId: string,
	limit: number,
	skip: number,
) => {
	return queryOptions<TConfigurationSchema[]>({
		queryKey: ["configuration-schema", { businessId, limit, skip }],
		queryFn: () => getAllConfigurationSchema({ businessId, limit, skip }),
	});
};

export const useGetAllConfigurationSchema = ({
	queryConfig = {},
	businessId,
	limit = 10,
	skip = 0,
}: TUseGetAllConfigurationSchemaParams) => {
	return useQuery({
		...getAllConfigurationSchemaOptions(businessId, limit, skip),
		...queryConfig,
	});
};
