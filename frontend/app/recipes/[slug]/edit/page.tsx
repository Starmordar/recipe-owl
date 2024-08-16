import { Suspense } from 'react';

import RecipeSkeleton from '@/components/recipe-description/skeleton';
import EditRecipe from '@/components/recipe-details-form/edit-recipe';

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense key={params.slug} fallback={<RecipeSkeleton />}>
      <EditRecipe recipeId={Number(params.slug)} />
    </Suspense>
  );
}
