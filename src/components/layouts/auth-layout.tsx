import React from "react";
import { authChildrenWrapper, authLayoutTitle } from "./layouts.css";

interface IAuthLayout {
	title: string;
	children: React.ReactNode;
}

const AuthLayout = ({ title, children }: IAuthLayout) => {
	return (
		<>
			<h2 className={authLayoutTitle}>{title}</h2>
			<div className={authChildrenWrapper}>{children}</div>
		</>
	);
};

export default AuthLayout;
