import CloseIcon from "@mui/icons-material/Close";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
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
	alignItems: "center",
	padding: theme.spacing(2, 3),
	color: theme.palette.text.primary,
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

interface IModalProps {
	open: boolean;
	title: string;
	subtitle?: string;
	onClose: () => void;
	onAction?: () => void;
	actionName?: string;
	children?: React.ReactNode;
	maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
	fullWidth?: boolean;
}

const Modal: React.FC<IModalProps> = ({
	open,
	title,
	subtitle,
	onClose,
	onAction,
	actionName = "Confirm",
	children,
	maxWidth = "sm",
	fullWidth = true,
}) => {
	return (
		<StyledDialog
			open={open}
			onClose={onClose}
			maxWidth={maxWidth}
			fullWidth={fullWidth}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<StyledDialogTitle id="modal-title">
				<Typography variant="h3">{title}</Typography>
				<StyledCloseButton aria-label="close" onClick={onClose}>
					<CloseIcon />
				</StyledCloseButton>
			</StyledDialogTitle>

			<DialogContent>
				{subtitle && (
					<DialogContentText
						id="modal-description"
						sx={{ color: "text.secondary", mb: 2 }}
					>
						{subtitle}
					</DialogContentText>
				)}
				{children}
			</DialogContent>

			<DialogActions sx={{ padding: 2, paddingTop: 0 }}>
				<Button
					onClick={onClose}
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
					color="primary"
					autoFocus
				>
					{actionName}
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default Modal;
