import { prisma } from '@/prisma/prisma-client';

async function leaveSharedCart(userId: string, cartId: number) {
  await prisma.sharedCart.deleteMany({ where: { userId, cartId } });
}

export { leaveSharedCart };
