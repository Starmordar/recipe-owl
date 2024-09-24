'use server';

import { Ingredient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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

export async function addIngredientsToCart(
  recipeId: number,
  ingredientIds: Array<number>,
  quantity: number,
): Promise<{ id: number }> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const items = ingredientIds.map(ingredientId => ({ recipeId, ingredientId, quantity }));

  const existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (existingCart === null) {
    return prisma.cart.create({ data: { userId: user.id, items: { create: items } } });
  }

  const cartId = await prisma.cart.update({
    where: { id: existingCart.id, userId: user.id },
    data: { items: { create: items } },
  });

  revalidatePath(publicUrls.cart);
  return cartId;
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
