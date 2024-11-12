'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';

import { prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';

async function addIngredientsToCart(
  recipeId: number,
  ingredientIds: Array<number>,
  quantity: number,
  shareToken?: string | null,
): Promise<{ id: number }> {
  const ingredients = ingredientIds.map(ingredientId => ({ recipeId, ingredientId, quantity }));

  const [cartId, userId] = await getCartInfo(shareToken);
  if (cartId === undefined) {
    return prisma.cart.create({ data: { userId, items: { create: ingredients } } });
  }

  await prisma.cart.update({
    where: { id: cartId, userId },
    data: { items: { create: ingredients } },
  });

  revalidatePath(publicUrls.cart);
  return { id: cartId };
}

async function getCartInfo(shareToken?: string | null): Promise<[number | undefined, string]> {
  let existingCart = null;
  if (shareToken) existingCart = await prisma.cart.findFirst({ where: { shareToken } });
  if (existingCart) return [existingCart.id, existingCart.userId];

  const { user } = await validateRequest();
  invariant(user, 'An authorized user is required');

  existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  return [existingCart?.id, user.id];
}

export { addIngredientsToCart };
