import { prisma } from '@/prisma/prisma-client';

import { groupBy } from '../utils';

import type { Prisma, Ingredient } from '@prisma/client';

export interface CartRecipe {
  recipe: Prisma.RecipeGetPayload<{ select: { id: true; title: true; imageUrl: true } }> | null;
  ingredients: Array<Ingredient | null> | null;
}

export async function getCart(): Promise<Array<CartRecipe>> {
  const cart = await prisma.cart.findFirst({
    include: {
      items: {
        include: {
          recipe: { select: { id: true, title: true, imageUrl: true } },
          ingredient: true,
        },
      },
    },
  });

  if (cart === null) return [];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const groupedItems = groupBy(cart.items, ({ recipe }) => recipe!.id);

  const items = Object.entries(groupedItems).flatMap(([recipeId, data]) => {
    if (!data) return [];
    return { recipe: data[0].recipe, ingredients: data.map(d => d.ingredient) };
  });

  return items;
}

export async function ingredientsInCart(): Promise<number> {
  const cart = await prisma.cart.findFirst();
  if (cart === null) return 0;

  const itemsCount = await prisma.cartItem.count({ where: { cartId: cart.id } });
  return itemsCount;
}
