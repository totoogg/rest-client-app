import { FC, ReactNode } from 'react';
import Header from '@/widgets/header';
import Footer from '@/widgets/footer';
import MainLayout from './mainLayout';

interface ChildrenProps {
  children: ReactNode;
}

const Layout: FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
      <Footer />
    </>
  );
};

export default Layout;
