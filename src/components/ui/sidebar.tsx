import {
	AccountBalance,
	Assessment,
	AssignmentInd,
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
	useTheme,
} from "@mui/material";
import { useState } from "react";

interface IMenuItem {
	text: string;
	icon: React.ReactNode;
	children?: IMenuItem[];
}

const menuItems: IMenuItem[] = [
	{
		text: "Configuration",
		icon: <Settings />,
		children: [
			{ text: "Schemes", icon: <Description /> },
			{ text: "Staffs", icon: <People /> },
		],
	},
	{ text: "Users", icon: <AssignmentInd /> },
	{
		text: "Scheme",
		icon: <AccountBalance />,
		children: [
			{ text: "Savings", icon: <Savings /> },
			{ text: "Loan", icon: <Payment /> },
		],
	},
	{ text: "Report", icon: <Assessment /> },
	{ text: "Audit", icon: <History /> },
	{ text: "Logout", icon: <Logout /> },
];

const Sidebar = () => {
	const theme = useTheme();
	const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
		Configuration: false,
		Scheme: false,
	});

	const handleClick = (text: string) => {
		setOpenMenus((prev) => ({
			...prev,
			[text]: !prev[text],
		}));
	};

	const renderMenuItem = (item: IMenuItem, paddingLeft = 2) => {
		const hasChildren = item.children && item.children.length > 0;
		const isOpen = openMenus[item.text] || false;

		return (
			<Box key={item.text}>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => hasChildren && handleClick(item.text)}
						sx={{
							pl: paddingLeft,
							color: theme.palette.text.secondary,
							"&:hover": {
								backgroundColor: `${theme.palette.primary.main}14`, // Using primary color with 8% opacity
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
									fontWeight: hasChildren ? 600 : 400,
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
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<Toolbar />
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
				{menuItems.map((item) => renderMenuItem(item))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
