'use server';

import { revalidatePath } from 'next/cache';

import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';
import { deleteRecipeIndex, indexRecipe, updateRecipeIndex } from '@/lib/elastic/data';
import { UnauthorizedError } from '@/lib/errors/UnauthorizedError';
import { imageUpload } from '@/lib/image';
import { pickBy } from '@/lib/utils';
import { prisma } from '@/prisma/prisma-client';

import type { FormDataValues, FormValues } from '@/components/recipe-details-form/constants/shema';
import type { Recipe, Ingredient } from '@prisma/client';

export async function createRecipe(formData: FormData): Promise<Recipe> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const image = formData.get('image') as FormValues['image'];
  const data = JSON.parse(formData.get('data') as string) as FormDataValues;

  const imageUrl = await imageUpload.upload(image);
  const ingredients = data.ingredients.map((ingredient, i) => ({ ...ingredient, order: i }));

  const recipe = await prisma.recipe.create({
    data: { ...data, imageUrl, createdById: user.id, ingredients: { create: ingredients } },
  });

  const ingredientNames = ingredients.map(i => i.name);
  await indexRecipe(recipe, ingredientNames);

  revalidatePath(publicUrls.recipes);
  return recipe;
}

export async function updateRecipe(recipeId: number, formData: FormData): Promise<Recipe> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const image = formData.get('image') as FormValues['image'];
  const data = JSON.parse(formData.get('data') as string) as FormDataValues;

  const imageUrl = typeof image !== 'string' ? await imageUpload.upload(image) : undefined;
  const ingredients = data.ingredients.map((ingredient, i) => ({ ...ingredient, order: i }));

  const { toCreate, toUpdate, toDelete } = await getIngredientListPayload(
    recipeId,
    ingredients as Array<Ingredient>,
  );

  const recipe = await prisma.recipe.update({
    where: { id: recipeId },
    data: {
      ...data,
      imageUrl: imageUrl || undefined,
      ingredients: {
        deleteMany: toDelete.length > 0 ? { id: { in: toDelete } } : undefined,
        update: toUpdate.length > 0 ? toUpdate : undefined,
        create: toCreate.length > 0 ? toCreate : undefined,
      },
    },
  });

  const ingredientNames = ingredients.map(i => i.name);
  await updateRecipeIndex(recipe, ingredientNames);

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);

  return recipe;
}

export async function deleteRecipe(recipeId: number): Promise<void> {
  const recipe = await prisma.recipe.delete({
    where: { id: recipeId },
  });

  await deleteRecipeIndex(recipe.id);

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);
}

export async function saveRecipe(userId: string, recipeId: number): Promise<void> {
  await prisma.savedRecipe.create({
    data: { userId, recipeId },
  });

  revalidatePath(publicUrls.recipe(recipeId));
}

export async function unsaveRecipe(userId: string, recipeId: number): Promise<void> {
  await prisma.savedRecipe.deleteMany({
    where: { userId, recipeId },
  });

  revalidatePath(publicUrls.recipe(recipeId));
}

async function getIngredientListPayload(recipeId: number, ingredients: Array<Ingredient>) {
  const existingIngredients = await prisma.ingredient.findMany({ where: { recipeId } });

  const toCreate = [];
  const toUpdate = [];

  for (const ingredient of ingredients) {
    const existingIngredient = existingIngredients.find(existing => existing.id === ingredient.id);

    if (!existingIngredient) {
      toCreate.push(ingredient);
      continue;
    }

    if (!isEqualIngredients(existingIngredient, ingredient)) {
      toUpdate.push({ where: { id: ingredient.id }, data: ingredient });
      continue;
    }
  }

  const toDelete = existingIngredients
    .filter(existing => !ingredients.some(i => i.id === existing.id))
    .map(i => i.id);

  return { toCreate, toUpdate, toDelete };
}

function isEqualIngredients(ingredient1: Ingredient, ingredient2: Ingredient) {
  const string1 = JSON.stringify(pickBy(ingredient1, ['id', 'name', 'order', 'unit']));
  const string2 = JSON.stringify(pickBy(ingredient2, ['id', 'name', 'order', 'unit']));

  return string1 === string2;
}
