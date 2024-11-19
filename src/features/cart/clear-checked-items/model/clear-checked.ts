'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { publicUrls } from '@/src/shared/config/url';

async function clearCheckedItems(cartId: number): Promise<void> {
  await prisma.cartItem.deleteMany({ where: { cartId: cartId, isChecked: true } });
  revalidatePath(publicUrls.cart);
}

export { clearCheckedItems };
