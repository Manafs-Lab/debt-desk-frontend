import { LOGIN_ROUTE } from "@/config/constant";
import React from "react";
import { Redirect, Route } from "wouter";
import useAuthStore from "../../features/auth/auth.store";

type PrivateRouteProps = {
	path: string;
	component: () => JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, component }) => {
	const { isAuthenticated } = useAuthStore();
	if (!isAuthenticated) {
		return <Redirect to={LOGIN_ROUTE} />;
	}
	return <Route path={path} component={() => <>{component()}</>} />;
};

export default PrivateRoute;
