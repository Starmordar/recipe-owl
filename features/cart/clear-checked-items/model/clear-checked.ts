import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function clearCheckedItems(cartId: number): Promise<void> {
  await prisma.cartItem.deleteMany({ where: { cartId: cartId, isChecked: true } });
  revalidatePath(publicUrls.cart);
}

export { clearCheckedItems };
