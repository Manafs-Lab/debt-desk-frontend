import { Grid2 as Grid, Typography } from "@mui/material";
import { Skeleton } from "@mui/material";
import { useGetAllConfigurationScheme } from "../api/get-all-configuration-scheme";
import SchemeCard from "./configuration-scheme-card";

const ConfigurationSchemeBody = () => {
	const { data: configurationSchemes, isLoading } =
		useGetAllConfigurationScheme({
			businessId: "0f7cf6eb-6af0-47d2-953d-cb440bf4f81d",
		});

	if (isLoading) {
		return (
			<Grid container spacing={3}>
				{[1, 2, 3, 4].map((item) => (
					<Grid size={{ md: 6 }} key={item}>
						<Skeleton
							variant="rectangular"
							height={250}
							sx={{
								borderRadius: 2,
								bgcolor: "white",
							}}
						/>
					</Grid>
				))}
			</Grid>
		);
	}

	if (configurationSchemes?.length === 0) {
		return <Typography variant="h6">No schemes found</Typography>;
	}

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
