import type { Prisma } from '@prisma/client';

interface RecipeSearchResult {
  id: string | number;
  title: string;
  imageUrl: string;
}

type RecipeDetails = Prisma.RecipeGetPayload<{ include: { ingredients: true; user: true } }>;
type RecipeWithUser = Prisma.RecipeGetPayload<{ include: { user: true } }>;

type RecipeOfTheDayDetails = Prisma.RecipeOfTheDayGetPayload<{
  include: { recipe: { include: { user: true } } };
}>;

export type { RecipeSearchResult, RecipeDetails, RecipeWithUser, RecipeOfTheDayDetails };
