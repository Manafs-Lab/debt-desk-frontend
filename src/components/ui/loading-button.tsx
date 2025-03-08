import { TButtonColors } from "@/types/theme.types";
import { Button, CircularProgress } from "@mui/material";

interface LoadingButtonProps {
	text: string;
	isLoading?: boolean;
	isDisabled?: boolean;
	variant?: "text" | "outlined" | "contained";
	color?: TButtonColors;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
	text,
	isLoading = false,
	isDisabled = false,
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
			disabled={isDisabled || isLoading}
			sx={{
				display: "flex",
				alignItems: "center",
				gap: 1,
				minWidth: 120,
				"&.Mui-disabled": {
					backgroundColor: `${color}.main`,
					opacity: 0.7,
					color: `${color}.contrastText`,
				},
			}}
		>
			{isLoading && <CircularProgress size={15} color="inherit" />}
			{text}
		</Button>
	);
};

export default LoadingButton;
