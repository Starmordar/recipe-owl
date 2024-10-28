import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function disableCartSharing(cartId: number): Promise<void> {
  await prisma.cart.update({ where: { id: cartId }, data: { shareToken: undefined } });
  await prisma.sharedCart.deleteMany({ where: { cartId } });

  revalidatePath(publicUrls.cart);
}

export { disableCartSharing };
