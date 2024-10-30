import { HowToStep, Recipe, WithContext } from 'schema-dts';

import type { RecipeDetails } from './types';

function getRecipeJsonLdScheme(recipe: RecipeDetails): WithContext<Recipe> {
  const recipeInstructions: Array<HowToStep> = recipe.steps.map(step => ({
    '@type': 'HowToStep',
    text: step,
    name: step,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',

    name: recipe.title,
    ...(recipe.description && { description: recipe.description }),
    datePublished: recipe.createdAt.toUTCString(),
    author: {
      '@type': 'Person',
      name: recipe.user.fullName,
      ...(recipe.user.picture && { image: recipe.user.picture }),
    },
    image: recipe.imageUrl,
    recipeIngredient: [...recipe.ingredients.map(({ name, unit }) => `${unit} ${name}`)],
    recipeInstructions: [...recipeInstructions],
    keywords: [recipe.title],
  };
}

export { getRecipeJsonLdScheme };
