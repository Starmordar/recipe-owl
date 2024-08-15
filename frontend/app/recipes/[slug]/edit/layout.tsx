import TopHeader from '@/components/layout/new-recipe-header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="fixed top-0 mx-0 w-full z-50 bg-white">
        <TopHeader />
      </div>

      <div className="h-[55px]"></div>

      {children}
    </>
  );
}
