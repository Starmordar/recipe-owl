import { notFound } from 'next/navigation';

import { getRecipeJsonLdSchema, getRecipeDetails, logRecipeView } from '@/src/entities/recipe';

import { RecipeDetailsHeader } from './page-header';
import { RecipeDetails } from './recipe-details';

interface RecipeDetailsPageProps {
  recipeId: number;
}

async function RecipeDetailsPage({ recipeId }: RecipeDetailsPageProps) {
  logRecipeView(recipeId);

  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return notFound();

  const jsonLd = getRecipeJsonLdSchema(recipe);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <RecipeDetailsHeader recipe={recipe} />

      <main className='page-container mt-2'>
        <RecipeDetails recipe={recipe} />
      </main>
    </>
  );
}

export { RecipeDetailsPage };
