import { Grid2 as Grid } from "@mui/material";
import { useGetAllConfigurationSchema } from "../api/get-all-configuration-schema";
import SchemeCard from "./configuration-scheme-card";

const ConfigurationSchemeBody = () => {
	const { data: configurationSchemes } = useGetAllConfigurationSchema({
		businessId: "0f7cf6eb-6af0-47d2-953d-cb440bf4f81d",
	});
	return (
		<Grid container spacing={3}>
			{configurationSchemes?.map((scheme) => (
				<Grid size={{ md: 6 }} key={scheme.id}>
					<SchemeCard scheme={scheme} />
				</Grid>
			))}
		</Grid>
	);
};

export default ConfigurationSchemeBody;
