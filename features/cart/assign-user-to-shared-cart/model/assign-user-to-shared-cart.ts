'use server';

import { prisma } from '@/shared/api/prisma-client';

type IsCartExists = boolean;

async function assignUserToSharedCart(userId: string, shareToken: string): Promise<IsCartExists> {
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

export { assignUserToSharedCart };
