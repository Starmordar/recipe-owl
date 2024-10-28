import type { Prisma } from '@prisma/client';

export interface RecipeSearchResult {
  id: string | number;
  title: string;
  imageUrl: string;
}

export type RecipePreview = Prisma.RecipeGetPayload<{ include: { user: true } }>;
export type RecipeDetails = Prisma.RecipeGetPayload<{ include: { ingredients: true; user: true } }>;
export type LatestRecipe = Prisma.RecipeGetPayload<{ include: { user: true } }>;
export type RecipeOfTheDay = Prisma.RecipeOfTheDayGetPayload<{
  include: { recipe: { include: { user: true } } };
}>;
