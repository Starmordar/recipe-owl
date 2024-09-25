import { validateRequest } from '@/app/(auth)/actions';
import { prisma } from '@/prisma/prisma-client';
import { CartDetails } from '@/types/api';

import { groupBy } from '../utils';

import type { Prisma, Ingredient } from '@prisma/client';

export interface CartWithRecipes {
  cart: CartDetails;
  checked: CartDetails['items'];
  shared: Array<SharedIngredient>;

  items: Array<CartRecipe>;
}

export interface CartRecipe {
  recipe: Prisma.RecipeGetPayload<{ select: { id: true; title: true; imageUrl: true } }>;
  ingredients: Array<Ingredient & { itemId: number }>;
  quantity: number;
}

export interface SharedIngredient {
  name: string;
  ingredients: Array<{
    itemId: number;
    id: number;
    recipeId: number;
    recipe: CartRecipe['recipe'];
    unit: string;
    quantity: number;
  }>;
}

const cartDetailsInclude = {
  items: {
    include: { recipe: { select: { id: true, title: true, imageUrl: true } }, ingredient: true },
  },
  user: true,
};

export async function getCartByShareToken(shareToken: string): Promise<CartWithRecipes | null> {
  const cartDetails = await getCartDetails({ shareToken });
  if (cartDetails === null) return null;

  return getCartWithItems(cartDetails);
}

export async function getOrCreateCartByUser(userId: string): Promise<CartWithRecipes> {
  const cartDetails = await getCartDetails({ userId });

  if (cartDetails === null) {
    const createdCart = await prisma.cart.create({ data: { userId }, include: cartDetailsInclude });
    return getCartWithItems(createdCart);
  }

  return getCartWithItems(cartDetails);
}

export async function getCartDetails(where: Prisma.CartWhereInput): Promise<CartDetails | null> {
  return prisma.cart.findFirst({ where, include: cartDetailsInclude });
}

export function getCartWithItems(cart: CartDetails): CartWithRecipes {
  const checked = getCheckedIngredients(cart);
  const checkedIds = new Set(checked.map(item => item.id));

  const uncheckedItems = cart.items.filter(item => !checkedIds.has(item.id));
  const shared = getSharedIngredients(uncheckedItems);
  const items = getCartIngredients(uncheckedItems, shared);

  return { cart, shared, checked, items };
}

export async function ingredientsInCart(): Promise<number> {
  const { user } = await validateRequest();
  if (user === null) return 0;

  const cart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (cart === null) return 0;

  const itemsCount = await prisma.cartItem.count({ where: { cartId: cart.id } });
  return itemsCount;
}

function getCheckedIngredients(cart: CartDetails) {
  const checked = cart.items.filter(item => item.isChecked);
  return checked;
}

function getCartIngredients(items: CartDetails['items'], shared: Array<SharedIngredient>) {
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

function getSharedIngredients(items: CartDetails['items']): Array<SharedIngredient> {
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
