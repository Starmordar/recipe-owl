'use server';

import { prisma } from '@/shared/api/prisma-client';

async function enableCartSharing(cartId: number, shareToken: string) {
  await prisma.cart.update({ where: { id: cartId }, data: { shareToken } });
  return shareToken;
}

export { enableCartSharing };
