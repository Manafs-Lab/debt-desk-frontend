import DashboardLayout from "@/components/layouts/dashboard-layout";
import ConfigurationStaffBody from "@/features/configuration/staff/components/configuration-staff-body";
import ConfigurationStaffHeader from "@/features/configuration/staff/components/configuration-staff-header";

const ConfigurationStaff = () => {
	return (
		<DashboardLayout>
			<ConfigurationStaffHeader />
			<ConfigurationStaffBody />
		</DashboardLayout>
	);
};

export default ConfigurationStaff;
