import { notFound } from 'next/navigation';

import { getRecipeDetails } from '@/src/entities/recipe';

async function getMetadata(recipeId: number) {
  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return notFound();

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      images: [recipe.imageUrl],
    },
  };
}

export { getMetadata };
