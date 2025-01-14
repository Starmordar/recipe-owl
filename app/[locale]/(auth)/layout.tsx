import { AuthBackground } from '@/src/widgets/auth';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <main className='page-container items-center pt-[10vh] px-6'>
      <AuthBackground />
      {children}
    </main>
  );
}

export default Layout;
