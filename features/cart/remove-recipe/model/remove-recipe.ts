'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function removeRecipe(cartId: number, recipeId: number): Promise<void> {
  await prisma.cartItem.deleteMany({ where: { cartId: cartId, recipeId: recipeId } });
  revalidatePath(publicUrls.cart);
}

export { removeRecipe };
