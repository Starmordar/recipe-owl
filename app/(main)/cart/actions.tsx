'use server';

import { Ingredient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';
import { UnauthorizedError } from '@/lib/errors/UnauthorizedError';
import { prisma } from '@/prisma/prisma-client';
import { CartWithUser } from '@/types/api';

async function updateOrCreateCart(
  recipeId: number,
  ingredients: Array<Ingredient>,
): Promise<{ id: number }> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const items = ingredients.map(({ id: ingredientId }) => ({ recipeId, ingredientId }));

  const existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (existingCart === null) {
    return prisma.cart.create({ data: { userId: user.id, items: { create: items } } });
  }

  return prisma.cart.update({
    where: { id: existingCart.id, userId: user.id },
    data: { items: { create: items } },
  });
}

export async function addRecipeToCart(
  recipeId: number,
  ingredients: Array<Ingredient>,
): Promise<{ id: number }> {
  const cart = await updateOrCreateCart(recipeId, ingredients);

  revalidatePath(publicUrls.cart);
  return cart;
}

export async function removeRecipeFromCart(cartId: number, recipeId: number): Promise<void> {
  await prisma.cartItem.deleteMany({ where: { cartId: cartId, recipeId: recipeId } });

  revalidatePath(publicUrls.cart);
}

export async function removeIngredientFromCart(
  cartId: number,
  recipeIds: Array<number>,
  ingredientIds: Array<number>,
): Promise<void> {
  await prisma.cartItem.deleteMany({
    where: { cartId, recipeId: { in: recipeIds }, ingredientId: { in: ingredientIds } },
  });

  revalidatePath(publicUrls.cart);
}

export async function updateServings(
  cartId: number,
  recipeId: number,
  quantity: number,
): Promise<void> {
  await prisma.cartItem.updateMany({ where: { cartId, recipeId }, data: { quantity } });

  revalidatePath(publicUrls.cart);
}

async function getCartId(shareToken?: string | null): Promise<[number | undefined, string]> {
  let existingCart = null;
  if (shareToken) existingCart = await prisma.cart.findFirst({ where: { shareToken } });
  if (existingCart) return [existingCart.id, existingCart.userId];

  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  return [existingCart?.id, user.id];
}

export async function addIngredientsToCart(
  recipeId: number,
  ingredientIds: Array<number>,
  quantity: number,
  shareToken?: string | null,
): Promise<{ id: number }> {
  const items = ingredientIds.map(ingredientId => ({ recipeId, ingredientId, quantity }));

  const [cartId, userId] = await getCartId(shareToken);
  if (cartId === undefined) {
    return prisma.cart.create({ data: { userId, items: { create: items } } });
  }

  await prisma.cart.update({
    where: { id: cartId, userId },
    data: { items: { create: items } },
  });

  revalidatePath(publicUrls.cart);
  return { id: cartId };
}

export async function enableCartSharing(cartId: number, shareToken: string) {
  await prisma.cart.update({ where: { id: cartId }, data: { shareToken } });
  return shareToken;
}

type IsCartExists = boolean;
export async function assignUserToSharedCart(
  userId: string,
  shareToken: string,
): Promise<IsCartExists> {
  const existingCart = await prisma.cart.findFirst({ where: { shareToken } });
  if (existingCart === null) return false;

  if (existingCart.userId === userId) return true;

  const existingSharedCart = await prisma.sharedCart.findFirst({
    where: { userId, cartId: existingCart.id },
  });
  if (existingSharedCart !== null) return true;

  await prisma.sharedCart.create({ data: { userId, cartId: existingCart.id } });
  return true;
}

export async function leaveSharedCart(userId: string, cartId: number) {
  await prisma.sharedCart.deleteMany({ where: { userId, cartId } });
}

export async function getSharedCarts(userId: string): Promise<Array<CartWithUser>> {
  const sharedCarts = await prisma.sharedCart.findMany({
    where: { userId },
    include: { cart: { include: { user: { select: { fullName: true, picture: true } } } } },
  });

  return sharedCarts.map(({ cart }) => cart);
}

export async function clearCart(cartId: number): Promise<void> {
  await prisma.cartItem.deleteMany({ where: { cartId } });
  revalidatePath(publicUrls.cart);
}

export async function disableCartSharing(cartId: number): Promise<void> {
  await prisma.cart.update({ where: { id: cartId }, data: { shareToken: undefined } });
  await prisma.sharedCart.deleteMany({ where: { cartId } });

  revalidatePath(publicUrls.cart);
}
