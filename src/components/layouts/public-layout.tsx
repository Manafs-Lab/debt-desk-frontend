import { publicChildrenWrapper } from "./layouts.css";

interface IPublicLayout {
	children: React.ReactNode;
}

const PublicLayout = ({ children }: IPublicLayout) => {
	return (
		<>
			{/* Add Navbar component here */}
			<div className={publicChildrenWrapper}>{children}</div>
		</>
	);
};

export default PublicLayout;
