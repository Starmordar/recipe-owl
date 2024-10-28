'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function updateServings(cartId: number, recipeId: number, quantity: number): Promise<void> {
  await prisma.cartItem.updateMany({ where: { cartId, recipeId }, data: { quantity } });
  revalidatePath(publicUrls.cart);
}

export { updateServings };
