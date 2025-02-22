import React from "react";
import Sidebar from "../ui/sidebar";
import { dashboardChildrenWrapper } from "./layouts.css";

interface IDashboardLayout {
	children: React.ReactNode;
}

interface IDashboardLayout {
	children: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayout) => {
	return (
		<div style={{ display: "flex" }}>
			<Sidebar />
			<div className={dashboardChildrenWrapper}>{children}</div>
		</div>
	);
};

export default DashboardLayout;
