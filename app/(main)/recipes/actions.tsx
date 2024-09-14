'use server';

import { revalidatePath } from 'next/cache';

import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';
import { UnauthorizedError } from '@/lib/errors/UnauthorizedError';
import { imageUpload } from '@/lib/image';
import { prisma } from '@/prisma/prisma-client';

import type { Recipe } from '@prisma/client';

export async function createRecipe(formData: FormData): Promise<Recipe> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const image = formData.get('image') as File;
  const data = JSON.parse(formData.get('data') as string);

  const imageUrl = await imageUpload.upload(image);

  const recipe = await prisma.recipe.create({
    data: { ...data, imageUrl, createdById: user.id, ingredients: { create: data.ingredients } },
  });

  revalidatePath(publicUrls.recipes);
  return recipe;
}

export async function updateRecipe(recipeId: number, formData: FormData): Promise<Recipe> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const image = formData.get('image') as File;
  const data = JSON.parse(formData.get('data') as string);

  const imageUrl = typeof image !== 'string' ? await imageUpload.upload(image) : undefined;
  const textUpdate = { ...data, ingredients: { deleteMany: {}, create: data.ingredients } };

  const recipe = await prisma.recipe.update({
    where: { id: recipeId },
    data: imageUrl ? { ...textUpdate, imageUrl } : textUpdate,
  });

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);

  return recipe;
}

export async function deleteRecipe(recipeId: number): Promise<void> {
  const recipe = await prisma.recipe.delete({
    where: { id: recipeId },
  });

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);
}

export async function saveRecipe(userId: string, recipeId: number): Promise<void> {
  await prisma.savedRecipe.create({
    data: { userId, recipeId },
  });

  revalidatePath(publicUrls.recipe(recipeId));
}

export async function removeSavedRecipe(userId: string, recipeId: number): Promise<void> {
  await prisma.savedRecipe.deleteMany({
    where: { userId, recipeId },
  });

  revalidatePath(publicUrls.recipe(recipeId));
}
