import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { publicUrls } from '@/src/shared/config/url';

async function clearCart(cartId: number): Promise<void> {
  await prisma.cartItem.deleteMany({ where: { cartId } });
  revalidatePath(publicUrls.cart);
}

export { clearCart };
