'use server';

import { revalidatePath } from 'next/cache';

import { imageUploadService } from '@/src/entities/image';
import { elastic, prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { UnauthorizedError } from '@/src/shared/lib/errors/UnauthorizedError';

import type { FormDataValues, FormValues } from '@/src/widgets/recipe-details-form/model/shema';
import type { Recipe } from '@prisma/client';

async function createRecipe(formData: FormData): Promise<Recipe> {
  const { user } = await validateRequest();
  if (user === null) throw new UnauthorizedError();

  const image = formData.get('image') as FormValues['image'];
  const data = JSON.parse(formData.get('data') as string) as FormDataValues;

  const imageUrl = await imageUploadService.upload(image);
  const ingredients = data.ingredients.map((ingredient, i) => ({ ...ingredient, order: i }));

  const recipe = await prisma.recipe.create({
    data: { ...data, imageUrl, createdById: user.id, ingredients: { create: ingredients } },
  });

  const ingredientNames = ingredients.map(i => i.name);
  await indexRecipe(recipe, ingredientNames);

  revalidatePath(publicUrls.recipes);
  return recipe;
}

async function indexRecipe(recipe: Recipe, ingredients: Array<string>): Promise<void> {
  await elastic.index({
    index: 'recipes',
    id: recipe.id.toString(),
    body: {
      title: recipe.title,
      description: recipe.description,
      ingredients: ingredients,
      imageUrl: recipe.imageUrl,
      createdById: recipe.createdById,
      createdAt: recipe.createdAt,
    },
  });
}

export { createRecipe };
