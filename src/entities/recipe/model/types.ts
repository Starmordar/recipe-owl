import type { Prisma } from '@prisma/client';

interface RecipeSearchResult {
  id: number;
  title: string;
  imageUrl: string;
  cookTime: string | null;
  tags: Array<string>;
}

type RecipeBase = Prisma.RecipeGetPayload<true>;
type RecipeDetails = Prisma.RecipeGetPayload<{ include: { ingredients: true; user: true } }>;
type RecipeWithUser = Prisma.RecipeGetPayload<{ include: { user: true } }>;

type RecipeOfTheDayDetails = Prisma.RecipeOfTheDayGetPayload<{
  include: { recipe: { include: { user: true } } };
}>;

interface ElasticRecipeView {
  recipeId: number;
  userId: string;
}

interface ElasticRecipe {
  title: string;
  description: string | null;
  ingredients: Array<string>;
  imageUrl: string;
  tags: Array<string>;
  cookTime: string | null;
  createdById: string;
  createdAt: Date;
}

interface UpdateRecipePayload {
  title: string;
  description: string;
  source: string;
  image: File | string;
  cookTime: string;
  tags: Array<string>;

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
  ElasticRecipeView,
  RecipeSearchResult,
  RecipeBase,
  RecipeDetails,
  RecipeWithUser,
  RecipeOfTheDayDetails,
  UpdateRecipePayload,
};
