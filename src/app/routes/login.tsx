import PublicLayout from "@/components/layouts/public-layout";
import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {
	return (
		<PublicLayout>
			<LoginForm />
		</PublicLayout>
	);
};

export default LoginPage;
