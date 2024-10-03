import { elastic } from './setup';

import type { Recipe } from '@prisma/client';

async function indexRecipe(recipe: Recipe, ingredients: Array<string>): Promise<void> {
  await elastic.index({
    index: 'recipes',
    id: recipe.id.toString(),
    body: {
      title: recipe.title,
      description: recipe.description,
      ingredients: ingredients,
      imageUrl: recipe.imageUrl,
      createdById: recipe.createdById,
      createdAt: recipe.createdAt,
    },
  });
}

async function updateRecipeIndex(recipe: Recipe, ingredients: Array<string>): Promise<void> {
  await elastic.update({
    index: 'recipes',
    id: recipe.id.toString(),
    body: {
      doc: {
        title: recipe.title,
        description: recipe.description,
        ingredients: ingredients,
        imageUrl: recipe.imageUrl,
        createdById: recipe.createdById,
        createdAt: recipe.createdAt,
      },
    },
  });
}

async function deleteRecipeIndex(recipeId: number) {
  await elastic.delete({ index: 'recipes', id: recipeId.toString() });
}

export { indexRecipe, updateRecipeIndex, deleteRecipeIndex };
