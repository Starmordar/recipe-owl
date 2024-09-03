'use server';

import { Ingredient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { publicUrls } from '@/config/url';
import { prisma } from '@/prisma/prisma-client';

async function updateOrCreateCart(
  recipeId: number,
  ingredients: Array<Ingredient>,
): Promise<{ id: number }> {
  const items = ingredients.map(({ id: ingredientId }) => ({ recipeId, ingredientId }));

  const existingCart = await prisma.cart.findFirst();
  if (existingCart === null) return prisma.cart.create({ data: { items: { create: items } } });

  return prisma.cart.update({
    where: { id: existingCart.id },
    data: { items: { create: items } },
  });
}

export async function addRecipeToCart(
  recipeId: number,
  ingredients: Array<Ingredient>,
): Promise<{ id: number }> {
  const cart = await updateOrCreateCart(recipeId, ingredients);

  revalidatePath(publicUrls.cart);
  return cart;
}
