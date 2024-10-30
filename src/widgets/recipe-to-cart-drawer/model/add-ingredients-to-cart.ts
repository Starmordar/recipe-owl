'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { UnauthorizedError } from '@/src/shared/lib/errors/UnauthorizedError';

async function getCartId(shareToken?: string | null): Promise<[number | undefined, string]> {
  let existingCart = null;
  if (shareToken) existingCart = await prisma.cart.findFirst({ where: { shareToken } });
  if (existingCart) return [existingCart.id, existingCart.userId];

  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  existingCart = await prisma.cart.findFirst({ where: { userId: user.id } });
  return [existingCart?.id, user.id];
}

async function addIngredientsToCart(
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

export { addIngredientsToCart };
