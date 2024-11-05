'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { publicUrls } from '@/src/shared/config/url';

async function updateCartItemCheckStatus(
  cartItemIds: Array<number>,
  isChecked: boolean,
): Promise<void> {
  await prisma.cartItem.updateMany({ where: { id: { in: cartItemIds } }, data: { isChecked } });
  revalidatePath(publicUrls.cart);
}

export { updateCartItemCheckStatus };
