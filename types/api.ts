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

export type IngredientDetails = Prisma.IngredientGetPayload<null>;

export type CartDetails = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        recipe: { select: { id: true; title: true; imageUrl: true } };
        ingredient: true;
      };
    };
    user: true;
  };
}>;

export type CartWithUser = Prisma.CartGetPayload<{
  include: { user: { select: { fullName: true; picture: true } } };
}>;
