import AppNavbar from '@/components/layout/app-navbar';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <AppNavbar />
    </>
  );
}

export default Layout;
