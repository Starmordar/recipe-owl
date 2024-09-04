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

export async function removeRecipeFromCart(recipeId: number): Promise<void> {
  const existingCart = await prisma.cart.findFirst();
  if (existingCart === null) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: existingCart.id, recipeId: recipeId },
  });

  revalidatePath(publicUrls.cart);
}

export async function removeIngredientFromCart(
  recipeId: number,
  ingredientId: number,
): Promise<void> {
  const existingCart = await prisma.cart.findFirst();
  if (existingCart === null) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: existingCart.id, recipeId, ingredientId },
  });

  revalidatePath(publicUrls.cart);
}

export async function updateServings(recipeId: number, quantity: number): Promise<void> {
  const existingCart = await prisma.cart.findFirst();
  if (existingCart === null) return;

  await prisma.cartItem.updateMany({
    where: { cartId: existingCart.id, recipeId },
    data: { quantity },
  });

  revalidatePath(publicUrls.cart);
}
