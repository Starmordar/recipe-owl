import { Prisma } from '@prisma/client';

import { ingredientsCategory } from '@/components/recipe-filters/constants/filter-categories';
import { prisma } from '@/prisma/prisma-client';

import type { RecipeDetails, RecipePreview } from '@/types/api';

export async function getRecipes(searchTerm: string): Promise<{ recipes: Array<RecipePreview> }> {
  const response = await fetch(`/api/recipes/?search=${searchTerm}`);
  const recipes = await response.json();

  return { recipes };
}

export async function getRecipesPreview(
  search: string,
  filters: Record<string, string | Array<string> | undefined>,
): Promise<{ recipes: Array<RecipePreview> }> {
  const where = buildRecipesFilter(search, filters);
  const recipes = await prisma.recipe.findMany({ where });

  return { recipes };
}

function buildRecipesFilter(
  search: string,
  filters: Record<string, string | Array<string> | undefined>,
): Prisma.RecipeWhereInput {
  const filter: Prisma.RecipeWhereInput = {};

  if (filters[ingredientsCategory]) {
    let ingredients = filters[ingredientsCategory];
    if (typeof ingredients === 'string') ingredients = [ingredients];
    filter['ingredients'] = { some: { name: { in: ingredients, mode: 'insensitive' } } };
  }

  if (search) {
    filter['title'] = { contains: search, mode: 'insensitive' };
  }

  return filter;
}

export async function getRecipeDetails(recipeId: number): Promise<RecipeDetails | null> {
  const recipe = await prisma.recipe.findFirst({
    where: { id: recipeId },
    include: { ingredients: { orderBy: { order: 'asc' } }, user: true },
  });

  return recipe;
}

export async function savedRecipes(userId: string): Promise<Array<RecipePreview>> {
  const response = await prisma.savedRecipe.findMany({
    where: { userId },
    include: { recipe: true },
  });

  if (response === null) return [];
  return response.map(({ recipe }) => recipe);
}

export async function isRecipeSaved(
  userId: string | undefined,
  recipeId: number,
): Promise<boolean> {
  if (!userId) return false;

  const savedRecipe = await prisma.savedRecipe.findFirst({
    where: { userId, recipeId },
  });

  return !!savedRecipe;
}
