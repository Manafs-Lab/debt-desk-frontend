import DashboardLayout from "@/components/layouts/dashboard-layout";
import UserBody from "@/features/User/components/user-body";
import UserHeader from "@/features/User/components/user-header";

const User = () => {
	return (
		<DashboardLayout>
			<UserHeader />
			<UserBody />
		</DashboardLayout>
	);
};

export default User;
