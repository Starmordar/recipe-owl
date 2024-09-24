import { validateRequest } from '@/app/(auth)/actions';
import { prisma } from '@/prisma/prisma-client';
import { CartDetails } from '@/types/api';

import { groupBy } from '../utils';

import type { Prisma, Ingredient } from '@prisma/client';

export interface CartWithRecipes {
  cart: CartDetails;
  items: Array<CartRecipe>;
  shared: Array<SharedIngredient>;
}

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

export async function getCartWithItems(cart: CartDetails) {
  const shared = getSharedIngredients(cart);
  const items = getCartIngredients(cart, shared);

  return { cart, shared, items };
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
