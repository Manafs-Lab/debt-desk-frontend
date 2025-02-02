import { contentChildrenWrapper } from "./layouts.css";

interface IContentLayout {
  children: React.ReactNode;
}

const ContentLayout = ({ children }: IContentLayout) => {
  return (
    <>
      {/* Add Navbar component here */}
      <div className={contentChildrenWrapper}>{children}</div>
    </>
  );
};

export default ContentLayout;
