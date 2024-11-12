import React, { Suspense } from 'react';

import { RecipeCards } from './recipe-cards';
import { RecipesPageHeader } from './recipes-page-header';
import { RecipesPageSkeleton } from './skeleton';

interface RecipesPageProps {
  searchParams: {
    search?: string;
    [key: string]: string | Array<string> | undefined;
  };
}

function RecipesPage({ searchParams }: RecipesPageProps) {
  const search = searchParams?.search ?? '';

  return (
    <>
      <RecipesPageHeader />

      <main className='page-container pt-2'>
        <Suspense key={JSON.stringify(searchParams)} fallback={<RecipesPageSkeleton />}>
          <RecipeCards search={search} filters={searchParams} />
        </Suspense>
      </main>
    </>
  );
}

export { RecipesPage };
