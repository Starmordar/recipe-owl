import { prisma } from '@/src/shared/api';

import { cartWithUserPayload } from './payload';

import type { CartWithUser } from './type';

async function getSharedCarts(userId: string): Promise<Array<CartWithUser>> {
  const sharedCarts = await prisma.sharedCart.findMany({
    where: { userId },
    include: { cart: cartWithUserPayload },
  });

  return sharedCarts.map(({ cart }) => cart);
}

export { getSharedCarts };
