import {
	AccountBalance,
	Assessment,
	AssignmentInd,
	Dashboard,
	Description,
	ExpandLess,
	ExpandMore,
	History,
	Logout,
	Payment,
	People,
	Savings,
	Settings,
} from "@mui/icons-material";
import {
	Box,
	Collapse,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "wouter";

interface IMenuItem {
	text: string;
	icon: React.ReactNode;
	path?: string;
	children?: IMenuItem[];
}

const mainMenuItems: IMenuItem[] = [
	{
		text: "Dashboard",
		icon: <Dashboard />,
		path: "/dashboard",
	},
	{
		text: "Configuration",
		icon: <Settings />,
		children: [
			{
				text: "Schemes",
				icon: <Description />,
				path: "/configuration/schemes",
			},
			{ text: "Staffs", icon: <People />, path: "/configuration/staffs" },
		],
	},
	{
		text: "Users",
		icon: <AssignmentInd />,
		path: "/users",
	},
	{
		text: "Scheme",
		icon: <AccountBalance />,
		children: [
			{ text: "Savings", icon: <Savings />, path: "/scheme/savings" },
			{ text: "Loan", icon: <Payment />, path: "/scheme/loan" },
		],
	},
	{
		text: "Report",
		icon: <Assessment />,
		path: "/report",
	},
	{
		text: "Audit",
		icon: <History />,
		path: "/audit",
	},
];

const bottomMenuItems: IMenuItem[] = [
	{
		text: "Logout",
		icon: <Logout />,
		path: "/logout",
	},
];

const Sidebar = () => {
	const theme = useTheme();
	const [location, setLocation] = useLocation();
	const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
		Configuration: false,
		Scheme: false,
	});

	const handleClick = (item: IMenuItem) => {
		if (item.children) {
			setOpenMenus((prev) => ({
				...prev,
				[item.text]: !prev[item.text],
			}));
		} else if (item.path) {
			setLocation(item.path);
		}
	};

	const isActive = (path?: string) => {
		if (!path) return false;
		return location === path;
	};

	const renderMenuItem = (item: IMenuItem, paddingLeft = 2) => {
		const hasChildren = item.children && item.children.length > 0;
		const isOpen = openMenus[item.text] || false;
		const active = isActive(item.path);

		return (
			<Box key={item.text}>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => handleClick(item)}
						sx={{
							pl: paddingLeft,
							color: active
								? theme.palette.primary.main
								: theme.palette.text.secondary,
							backgroundColor: active
								? `${theme.palette.primary.main}14`
								: "transparent",
							"&:hover": {
								backgroundColor: `${theme.palette.primary.main}14`,
							},
						}}
					>
						<ListItemIcon
							sx={{
								color: "inherit",
								minWidth: 40,
							}}
						>
							{item.icon}
						</ListItemIcon>
						<ListItemText
							primary={item.text}
							sx={{
								"& .MuiTypography-root": {
									...theme.typography.body1,
									fontWeight: 400,
								},
							}}
						/>
						{hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
					</ListItemButton>
				</ListItem>
				{hasChildren && (
					<Collapse in={isOpen} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{item &&
								item.children &&
								item.children.map((child) =>
									renderMenuItem(child, paddingLeft + 2),
								)}
						</List>
					</Collapse>
				)}
			</Box>
		);
	};

	return (
		<Drawer
			sx={{
				width: 270,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: 270,
					boxSizing: "border-box",
					backgroundColor: theme.palette.background.paper,
					borderRight: `1px solid ${theme.palette.divider}`,
					display: "flex",
					flexDirection: "column",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<Toolbar
				sx={{
					px: 2,
					minHeight: "64px",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h6"
					component="h1"
					sx={{
						color: theme.palette.primary.main,
						fontWeight: 600,
						fontSize: "1.5rem",
						cursor: "pointer",
					}}
					onClick={() => setLocation("/dashboard")}
				>
					DebtDesk
				</Typography>
			</Toolbar>
			<Divider />
			<List
				component="nav"
				sx={{
					flex: 1,
					"& .MuiListItemButton-root": {
						borderRadius: theme.shape.borderRadius,
						mx: 1,
						my: 0.5,
					},
				}}
			>
				{mainMenuItems.map((item) => renderMenuItem(item))}
			</List>
			<Divider />
			<List
				component="nav"
				sx={{
					"& .MuiListItemButton-root": {
						borderRadius: theme.shape.borderRadius,
						mx: 1,
						my: 0.5,
					},
				}}
			>
				{bottomMenuItems.map((item) => renderMenuItem(item))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
