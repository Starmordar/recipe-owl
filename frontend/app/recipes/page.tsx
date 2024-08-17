import { Suspense } from 'react';

import RecipesHeader from '@/components/layout/recipes-header';
import RecipePreviewCards from '@/components/recipe-preview-cards';
import RecipePreviewCardsSkeleton from '@/components/recipe-preview-cards/skeleton';

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

      <section>
        <Suspense key={JSON.stringify(searchParams)} fallback={<RecipePreviewCardsSkeleton />}>
          <RecipePreviewCards search={search} filters={searchParams} />
        </Suspense>
      </section>
    </>
  );
}

export default Page;
