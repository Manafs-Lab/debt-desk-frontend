import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormStore } from "../onboarding.store";

// Validation Schema
const UserSchema = z
	.object({
		userName: z.string().min(3, "Full Name must be at least 3 characters"),
		userPhone: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
		email: z.string().email("Invalid email format"),
		userAddress: z.string().min(5, "Address is too short"),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters")
			.regex(/[A-Z]/, "Password must contain an uppercase letter")
			.regex(/\d/, "Password must contain a number"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type TUserInfo = z.infer<typeof UserSchema>;

type TUserInfoProps = {
	step: number;
	steps: Array<string>;
	handleNext: () => void;
	handleBack: () => void;
};

const UserInfo = ({ step, steps, handleNext, handleBack }: TUserInfoProps) => {
	const {
		userName,
		userPhone,
		email,
		userAddress,
		password,
		confirmPassword,
		setField,
	} = useFormStore();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TUserInfo>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			userName: userName || "",
			userPhone: userPhone || "",
			email: email || "",
			userAddress: userAddress || "",
			password: password || "",
			confirmPassword: confirmPassword || "",
		},
	});

	// Handle form submission
	const onSubmit = (data: TUserInfo) => {
		console.log("User Data Submitted:", data);
		setField("userName", data.userName);
		setField("userPhone", data.userPhone);
		setField("email", data.email);
		setField("userAddress", data.userAddress);
		setField("password", data.password);
		setField("confirmPassword", data.confirmPassword);
		handleNext();
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)}>
			<TextField
				fullWidth
				label="Full Name"
				margin="normal"
				required
				error={!!errors.userName}
				helperText={errors.userName?.message}
				{...register("userName")}
			/>

			<TextField
				fullWidth
				label="Phone"
				type="tel"
				margin="normal"
				required
				error={!!errors.userPhone}
				helperText={errors.userPhone?.message}
				{...register("userPhone")}
			/>

			<TextField
				fullWidth
				label="Email"
				type="email"
				margin="normal"
				required
				error={!!errors.email}
				helperText={errors.email?.message}
				{...register("email")}
			/>

			<TextField
				fullWidth
				label="Address"
				margin="normal"
				required
				error={!!errors.userAddress}
				helperText={errors.userAddress?.message}
				{...register("userAddress")}
			/>

			{/* Password Field */}
			<TextField
				fullWidth
				label="Password"
				type={showPassword ? "text" : "password"}
				margin="normal"
				required
				error={!!errors.password}
				helperText={errors.password?.message}
				{...register("password")}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={() => setShowPassword((prev) => !prev)}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			{/* Confirm Password Field */}
			<TextField
				fullWidth
				label="Confirm Password"
				type={showConfirmPassword ? "text" : "password"}
				margin="normal"
				required
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword?.message}
				{...register("confirmPassword")}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={() => setShowConfirmPassword((prev) => !prev)}
								edge="end"
							>
								{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<Box sx={{ mt: 4 }}>
				<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
					{step > 1 && (
						<Button type="button" onClick={handleBack} sx={{ mr: 1 }}>
							Back
						</Button>
					)}
					<Button type="submit" variant="contained">
						{step === steps.length ? "Submit" : "Next"}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default UserInfo;
