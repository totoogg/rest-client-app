import { FC, ReactNode } from 'react';
import Header from '@/app/widgets/header';
import Footer from '@/app/widgets/footer';
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
