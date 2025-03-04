import DashboardLayout from "@/components/layouts/dashboard-layout";
import ConfigurationSchemeBody from "@/features/configuration/scheme/components/configuration-scheme-body";
import ConfigurationSchemeHeader from "@/features/configuration/scheme/components/configuration-scheme-header";

const ConfigurationScheme = () => {
	return (
		<DashboardLayout>
			<ConfigurationSchemeHeader />
			<ConfigurationSchemeBody />
		</DashboardLayout>
	);
};

export default ConfigurationScheme;
