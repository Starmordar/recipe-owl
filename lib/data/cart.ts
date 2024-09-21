import { validateRequest } from '@/app/(auth)/actions';
import { prisma } from '@/prisma/prisma-client';
import { CartDetails } from '@/types/api';

import { groupBy } from '../utils';

import type { Prisma, Ingredient } from '@prisma/client';

export interface CartRecipe {
  recipe: Prisma.RecipeGetPayload<{ select: { id: true; title: true; imageUrl: true } }>;
  ingredients: Array<Ingredient>;
  quantity: number;
}

export interface SharedIngredient {
  name: string;
  ingredients: Array<{
    id: number;
    recipeId: number;
    recipe: CartRecipe['recipe'];
    unit: string;
    quantity: number;
  }>;
}

export async function getCart(): Promise<{
  items: Array<CartRecipe>;
  shared: Array<SharedIngredient>;
}> {
  const { user } = await validateRequest();
  if (user === null) return { items: [], shared: [] };

  const cart = await prisma.cart.findFirst({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          recipe: { select: { id: true, title: true, imageUrl: true } },
          ingredient: true,
        },
      },
    },
  });

  if (cart === null) return { items: [], shared: [] };

  const shared = getSharedIngredients(cart);
  const items = getCartIngredients(cart, shared);

  return { items, shared };
}

export async function ingredientsInCart(): Promise<number> {
  const { user } = await validateRequest();
  if (user === null) return 0;

  const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (cart === null) return 0;

  const itemsCount = await prisma.cartItem.count({ where: { cartId: cart.id } });
  return itemsCount;
}

function getCartIngredients(cart: CartDetails, shared: Array<SharedIngredient>) {
  const sharedNames = new Set(shared.map(s => s.name));
  const groupedItems = groupBy(cart.items, ({ recipe }) => recipe.id);

  return Object.entries(groupedItems).flatMap(([recipeId, data]) => {
    if (!data) return [];

    return {
      recipe: data[0].recipe,
      ingredients: data.map(i => i.ingredient).filter(({ name }) => !sharedNames.has(name)),
      quantity: data[0].quantity,
    };
  });
}

function getSharedIngredients(cart: CartDetails): Array<SharedIngredient> {
  const groupedByName = groupBy(cart.items, ({ ingredient }) => ingredient.name);

  return Object.entries(groupedByName).flatMap(([name, data]) => {
    if (!data || data?.length === 1) return [];

    return {
      name,
      ingredients: data.map(({ recipeId, ingredient: { id, unit }, quantity, recipe }) => ({
        id,
        recipeId,
        recipe,
        unit,
        quantity,
      })),
    };
  });
}
