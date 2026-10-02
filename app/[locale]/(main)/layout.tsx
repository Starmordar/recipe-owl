import { AppFooterNav } from '@/src/widgets/app-footer-nav';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* From `lg` up the navigation is a rail on the left, so the page is shifted past it. */}
      <div className='contents lg:flex lg:flex-1 lg:flex-col lg:pl-20'>{children}</div>
      <AppFooterNav />
    </>
  );
}

export default Layout;
