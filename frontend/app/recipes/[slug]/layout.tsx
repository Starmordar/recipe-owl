import TopHeader from '@/components/layout/recipe-details-header';

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <>
      <div className='fixed top-0 mx-0 w-full z-50 bg-white'>
        <TopHeader recipeId={Number(params.slug)} />
      </div>

      <div className='h-[55px]'></div>

      {children}
    </>
  );
}
