import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function clearCart(cartId: number): Promise<void> {
  await prisma.cartItem.deleteMany({ where: { cartId } });
  revalidatePath(publicUrls.cart);
}

export { clearCart };
