import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getRecipeJsonLdScheme, getRecipeDetails } from '@/src/entities/recipe';

import { RecipeDetailsHeader } from './page-header';
import { RecipeDetails } from './recipe-details';
import { RecipeDetailsPageSkeleton } from './skeleton';

interface RecipeDetailsPageProps {
  recipeId: number;
}

async function RecipeDetailsPage({ recipeId }: RecipeDetailsPageProps) {
  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return notFound();

  const jsonLd = getRecipeJsonLdScheme(recipe);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <RecipeDetailsHeader recipeId={recipeId} />

      <main className='page-container'>
        <Suspense key={recipeId} fallback={<RecipeDetailsPageSkeleton />}>
          <RecipeDetails recipeId={recipeId} />
        </Suspense>
      </main>
    </>
  );
}

export { RecipeDetailsPage };
