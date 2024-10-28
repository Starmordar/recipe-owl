import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function updateCartItemCheckStatus(
  cartItemIds: Array<number>,
  isChecked: boolean,
): Promise<void> {
  await prisma.cartItem.updateMany({ where: { id: { in: cartItemIds } }, data: { isChecked } });
  revalidatePath(publicUrls.cart);
}

export { updateCartItemCheckStatus };
