import { Suspense } from 'react';

import RecipeDetailsHeader from '@/components/layout/recipe-details-header';
import RecipeDetails from '@/components/recipe-details';
import RecipeDetailsSkeleton from '@/components/recipe-details/skeleton';

function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <RecipeDetailsHeader recipeId={Number(params.slug)} />

      <main className='page-container'>
        <Suspense key={params.slug} fallback={<RecipeDetailsSkeleton />}>
          <RecipeDetails recipeId={Number(params.slug)} />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
