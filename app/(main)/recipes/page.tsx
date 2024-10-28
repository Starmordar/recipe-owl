import React, { Suspense } from 'react';

import RecipesHeader from '@/src/components/layout/recipes-header';
import RecipePreviewCards from '@/src/components/recipe-preview-cards';
import RecipePreviewCardsSkeleton from '@/src/components/recipe-preview-cards/skeleton';

interface PageProps {
  searchParams: {
    search?: string;
    [key: string]: string | Array<string> | undefined;
  };
}

function Page({ searchParams }: PageProps) {
  const search = searchParams?.search ?? '';

  return (
    <>
      <RecipesHeader />

      <main className='page-container'>
        <Suspense key={JSON.stringify(searchParams)} fallback={<RecipePreviewCardsSkeleton />}>
          <RecipePreviewCards search={search} filters={searchParams} />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
