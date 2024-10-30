import type { Prisma } from '@prisma/client';

interface RecipeSearchResult {
  id: string;
  title: string;
  imageUrl: string;
}

type RecipeDetails = Prisma.RecipeGetPayload<{ include: { ingredients: true; user: true } }>;
type RecipeWithUser = Prisma.RecipeGetPayload<{ include: { user: true } }>;

type RecipeOfTheDayDetails = Prisma.RecipeOfTheDayGetPayload<{
  include: { recipe: { include: { user: true } } };
}>;

interface ElasticRecipe {
  title: string;
  description: string | null;
  ingredients: Array<string>;
  imageUrl: string;
  createdById: string;
  createdAt: Date;
}

interface UpdateRecipePayload {
  title: string;
  description: string;
  source: string;
  image: File | string;

  ingredients: Array<{
    order: number;
    name: string;
    unit: string;
    id?: number;
  }>;
  steps: Array<string>;
}

export type {
  ElasticRecipe,
  RecipeSearchResult,
  RecipeDetails,
  RecipeWithUser,
  RecipeOfTheDayDetails,
  UpdateRecipePayload,
};
