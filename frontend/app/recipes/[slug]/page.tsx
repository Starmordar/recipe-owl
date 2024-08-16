import { Suspense } from 'react';

import Recipe from '@/components/recipe-description';
import RecipeSkeleton from '@/components/recipe-description/skeleton';

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Suspense key={params.slug} fallback={<RecipeSkeleton />}>
        <Recipe recipeId={Number(params.slug)} />
      </Suspense>
    </>
  );
}
