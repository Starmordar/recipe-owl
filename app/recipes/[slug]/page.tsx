import { Suspense } from 'react';

import RecipeDetailsHeader from '@/components/layout/recipe-details-header';
import RecipeDetails from '@/components/recipe-details';
import RecipeDetailsSkeleton from '@/components/recipe-details/skeleton';
import { getRecipe } from '@/lib/data/recipe';

import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const recipeId = Number(params.slug);
  const recipe = await getRecipe(recipeId);

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      images: [recipe.imageUrl],
    },
  };
}

function Page({ params }: PageProps) {
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
