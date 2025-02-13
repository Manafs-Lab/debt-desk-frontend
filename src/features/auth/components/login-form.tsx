import useAuthStore from "@/features/auth/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Box,
	Button,
	Container,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { z } from "zod";

const LoginSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export type TLoginData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
	const [, setLocation] = useLocation();
	const { login } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TLoginData>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: TLoginData) => {
		const isLoggedIn = await login(data.email, data.password);
		if (isLoggedIn) {
			setLocation("/dashboard");
		}
	};

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
					<Typography component="h1" variant="h5" align="center" gutterBottom>
						Sign In
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							autoComplete="email"
							autoFocus
							error={!!errors.email}
							helperText={errors.email?.message}
							{...register("email")}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={!!errors.password}
							helperText={errors.password?.message}
							{...register("password")}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default LoginForm;
