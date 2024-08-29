import { Suspense } from 'react';

import RecipeDetailsFormHeader from '@/components/layout/recipe-details-form-header';
import RecipeDetailsForm from '@/components/recipe-details-form';
import RecipeDetailsFormSkeleton from '@/components/recipe-details-form/skeleton';
import { publicUrls } from '@/config/url';

function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <RecipeDetailsFormHeader title='Update Recipe' prevUrl={publicUrls.recipe(params.slug)} />

      <main className='page-container'>
        <Suspense key={params.slug} fallback={<RecipeDetailsFormSkeleton />}>
          <RecipeDetailsForm recipeId={Number(params.slug)} />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
