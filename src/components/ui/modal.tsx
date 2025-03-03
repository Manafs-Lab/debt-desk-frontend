import { TButtonColors } from "@/types/theme.types";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-paper": {
		borderRadius: "12px",
		padding: theme.spacing(2),
		backgroundColor: theme.palette.background.paper,
	},
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "start",
	padding: theme.spacing(2, 3),
	color: theme.palette.text.primary,
}));

interface IModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	subtitle?: string;
	onClose?: () => void;
	onAction?: () => void;
	actionName?: string;
	children?: React.ReactNode;
	maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
	fullWidth?: boolean;
	actionColor?: TButtonColors;
	isActionPending?: boolean;
}

const Modal: React.FC<IModalProps> = ({
	open,
	setOpen,
	title,
	subtitle,
	onClose,
	onAction,
	actionName = "Confirm",
	children,
	maxWidth = "sm",
	fullWidth = true,
	actionColor = "primary",
	isActionPending = false,
}) => {
	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};
	return (
		<StyledDialog
			open={open}
			onClose={handleClose}
			maxWidth={maxWidth}
			fullWidth={fullWidth}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<StyledDialogTitle id="modal-title">
				<Box>
					<Typography variant="h3" id="modal-title">
						{title}
					</Typography>
					{subtitle && (
						<Typography
							variant="body2"
							id="modal-description"
							sx={{
								color: "text.secondary",
								mt: 1,
							}}
						>
							{subtitle}
						</Typography>
					)}
				</Box>
			</StyledDialogTitle>

			{children && <DialogContent>{children}</DialogContent>}

			<DialogActions sx={{ padding: 2, paddingTop: 0 }}>
				<Button
					onClick={handleClose}
					variant="outlined"
					sx={{
						color: "text.primary",
						borderColor: "text.primary",
						"&:hover": {
							borderColor: "primary.main",
							backgroundColor: "background.default",
						},
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={onAction}
					variant="contained"
					color={actionColor}
					autoFocus
					disabled={isActionPending}
					sx={{
						minWidth: 100,
						"&.Mui-disabled": {
							backgroundColor: `${actionColor}.main`,
							opacity: 0.7,
							color: `${actionColor}.contrastText`,
						},
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "28px",
						}}
					>
						{isActionPending ? (
							<CircularProgress size={24} color="inherit" />
						) : (
							actionName
						)}
					</Box>
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default Modal;
