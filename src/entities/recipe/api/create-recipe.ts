'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';

import { prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';
import { elastic } from '@/src/shared/api/elastic';
import { publicUrls } from '@/src/shared/config/url';
import { imageUploadService } from '@/src/shared/lib/image';

import { elasticIndexName } from '../config/elastic-index-name';
import { mapToElastic } from '../model/map-to-elastic';

import type { UpdateRecipePayload } from '../model/types';
import type { Recipe } from '@prisma/client';

async function createRecipe(formData: FormData): Promise<Recipe> {
  const { user } = await validateRequest();
  invariant(user, 'An authorized user is required');

  const image = formData.get('image');
  invariant(image && typeof image !== 'string', 'Expected a image file parameter');

  const payload = formData.get('data');
  invariant(typeof payload === 'string', 'Expected a payload parameter');

  const imageUrl = await imageUploadService.upload(image);
  const { ingredients, ...data } = JSON.parse(payload) as UpdateRecipePayload;

  const recipe = await prisma.recipe.create({
    data: { ...data, imageUrl, createdById: user.id, ingredients: { create: ingredients } },
  });

  await indexRecipe(recipe, ingredients);

  revalidatePath(publicUrls.recipes);
  return recipe;
}

async function indexRecipe(
  recipe: Recipe,
  ingredients: UpdateRecipePayload['ingredients'],
): Promise<void> {
  const ingredientNames = ingredients.map(i => i.name);

  await elastic.index({
    index: elasticIndexName,
    id: recipe.id.toString(),
    body: mapToElastic(recipe, ingredientNames),
  });
}

export { createRecipe };
