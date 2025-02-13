import React from "react";
import { dashboardChildrenWrapper } from "./layouts.css";

interface IDashboardLayout {
	children: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayout) => {
	return (
		<>
			<div className={dashboardChildrenWrapper}>{children}</div>
		</>
	);
};

export default DashboardLayout;
