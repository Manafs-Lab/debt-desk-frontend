import { Button, CircularProgress } from "@mui/material";

interface LoadingButtonProps {
	text: string;
	isLoading?: boolean;
	disabled?: boolean;
	variant?: "text" | "outlined" | "contained";
	color?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
	text,
	isLoading = false,
	disabled = false,
	variant = "contained",
	color = "primary",
	type = "button",
	onClick,
}) => {
	return (
		<Button
			type={type}
			variant={variant}
			color={color}
			onClick={onClick}
			disabled={disabled || isLoading}
			sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 120 }}
		>
			{isLoading && <CircularProgress size={15} color="inherit" />}
			{text}
		</Button>
	);
};

export default LoadingButton;
