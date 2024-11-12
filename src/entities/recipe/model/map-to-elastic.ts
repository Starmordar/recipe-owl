import type { ElasticRecipe } from './types';
import type { Recipe } from '@prisma/client';

function mapToElastic(recipe: Recipe, ingredients: Array<string>): ElasticRecipe {
  return {
    title: recipe.title,
    description: recipe.description,
    ingredients: ingredients,
    imageUrl: recipe.imageUrl,
    tags: recipe.tags,
    cookTime: recipe.cookTime,
    createdById: recipe.createdById,
    createdAt: recipe.createdAt,
  };
}

export { mapToElastic };
