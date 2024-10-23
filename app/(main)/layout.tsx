import { AppFooterNav } from '@/widgets/app-footer-nav';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <AppFooterNav />
    </>
  );
}

export default Layout;
