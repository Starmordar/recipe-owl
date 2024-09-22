'use server';

import { Ingredient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';
import { UnauthorizedError } from '@/lib/errors/UnauthorizedError';
import { prisma } from '@/prisma/prisma-client';

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

export async function removeRecipeFromCart(recipeId: number): Promise<void> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (existingCart === null) return;

  await prisma.cartItem.deleteMany({ where: { cartId: existingCart.id, recipeId: recipeId } });

  revalidatePath(publicUrls.cart);
}

export async function removeIngredientFromCart(
  recipeIds: Array<number>,
  ingredientIds: Array<number>,
): Promise<void> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (existingCart === null) return;

  await prisma.cartItem.deleteMany({
    where: {
      cartId: existingCart.id,
      recipeId: { in: recipeIds },
      ingredientId: { in: ingredientIds },
    },
  });

  revalidatePath(publicUrls.cart);
}

export async function updateServings(recipeId: number, quantity: number): Promise<void> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  if (existingCart === null) return;

  await prisma.cartItem.updateMany({
    where: { cartId: existingCart.id, recipeId },
    data: { quantity },
  });

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
