import { Suspense } from 'react';

import SearchBar from '@/components/layout/search-bar';
import RecipePreviewCards from '@/components/recipe-preview-cards';
import RecipePreviewCardsSkeleton from '@/components/recipe-preview-cards/skeleton';

interface PageProps {
  searchParams: {
    search?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default function Page({ searchParams }: PageProps) {
  const search = searchParams?.search ?? '';

  return (
    <>
      <div className='fixed top-0 mx-0 w-full z-50 bg-white'>
        <SearchBar />
      </div>
      <div className='h-[55px]'></div>

      <section>
        <Suspense key={JSON.stringify(searchParams)} fallback={<RecipePreviewCardsSkeleton />}>
          <RecipePreviewCards search={search} filters={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
