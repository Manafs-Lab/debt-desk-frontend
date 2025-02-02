import AuthLayout from "@/components/layouts/auth-layout";
import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {
	return (
		<AuthLayout title="Login">
			<LoginForm />
		</AuthLayout>
	);
};

export default LoginPage;
