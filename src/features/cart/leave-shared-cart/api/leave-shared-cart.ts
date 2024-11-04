'use server';

import { prisma } from '@/src/shared/api';

async function leaveSharedCart(userId: string, cartId: number) {
  await prisma.sharedCart.deleteMany({ where: { userId, cartId } });
}

export { leaveSharedCart };
