'use server';

import { revalidatePath } from 'next/cache';

import { validateRequest } from '@/entities/session';
import { UnauthorizedError } from '@/lib/errors/UnauthorizedError';
import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

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
