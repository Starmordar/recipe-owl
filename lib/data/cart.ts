import { cartDetailsPayload } from '@/entities/cart';
import { prisma } from '@/prisma/prisma-client';
import groupBy from '@/shared/lib/groupBy';

import type { CartDetails, CartSharedIngredient, CartWithRecipes } from '@/entities/cart';
import type { Prisma } from '@prisma/client';

export async function getCartByShareToken(shareToken: string): Promise<CartWithRecipes | null> {
  const cartDetails = await getCartDetails({ shareToken });
  if (cartDetails === null) return null;

  return getCartWithItems(cartDetails);
}

export async function getOrCreateCartByUser(userId: string): Promise<CartWithRecipes> {
  const cartDetails = await getCartDetails({ userId });

  if (cartDetails === null) {
    const createdCart = await prisma.cart.create({ data: { userId }, ...cartDetailsPayload });
    return getCartWithItems(createdCart as unknown as CartDetails);
  }

  return getCartWithItems(cartDetails);
}

export async function getCartDetails(where: Prisma.CartWhereInput): Promise<CartDetails | null> {
  return prisma.cart.findFirst({ where, ...cartDetailsPayload });
}

export function getCartWithItems(cart: CartDetails): CartWithRecipes {
  const checked = getCheckedIngredients(cart);
  const checkedIds = new Set(checked.map(item => item.id));

  const uncheckedItems = cart.items.filter(item => !checkedIds.has(item.id));
  const shared = getSharedIngredients(uncheckedItems);
  const items = getCartIngredients(uncheckedItems, shared);

  return { cart, shared, checked, items };
}

function getCheckedIngredients(cart: CartDetails) {
  const checked = cart.items.filter(item => item.isChecked);
  return checked;
}

function getCartIngredients(items: CartDetails['items'], shared: Array<CartSharedIngredient>) {
  const sharedNames = new Set(shared.map(s => s.name));
  const groupedItems = groupBy(items, ({ recipe }) => recipe.id);

  return Object.entries(groupedItems).flatMap(([recipeId, data]) => {
    if (!data) return [];

    return {
      recipe: data[0].recipe,
      ingredients: data
        .map(i => ({ ...i.ingredient, itemId: i.id }))
        .filter(({ name }) => !sharedNames.has(name)),
      quantity: data[0].quantity,
    };
  });
}

function getSharedIngredients(items: CartDetails['items']): Array<CartSharedIngredient> {
  const groupedByName = groupBy(items, ({ ingredient }) => ingredient.name);

  return Object.entries(groupedByName).flatMap(([name, data]) => {
    if (!data || data?.length === 1) return [];

    return {
      name,
      ingredients: data.map(
        ({ id, recipeId, ingredient: { id: ingredientId, unit }, quantity, recipe }) => ({
          itemId: id,
          id: ingredientId,
          recipeId,
          recipe,
          unit,
          quantity,
        }),
      ),
    };
  });
}
