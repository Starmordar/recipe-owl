import type { Prisma } from '@prisma/client';

export type RecipePreview = Prisma.RecipeGetPayload<null>;
export type RecipeDetails = Prisma.RecipeGetPayload<{ include: { ingredients: true; user: true } }>;

export type IngredientDetails = Prisma.IngredientGetPayload<null>;
