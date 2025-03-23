import { FC, ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

const MainLayout: FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <main className="main-container">{children}</main>
    </>
  );
};

export default MainLayout;
