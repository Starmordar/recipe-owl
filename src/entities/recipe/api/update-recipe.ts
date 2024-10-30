'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';

import { imageUploadService } from '@/src/entities/image';
import { prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';
import { elastic } from '@/src/shared/api/elastic';
import { publicUrls } from '@/src/shared/config/url';
import pick from '@/src/shared/lib/pick';

import { mapToElastic } from '../model/map-to-elastic';

import type { UpdateRecipePayload } from '../model/types';
import type { Recipe } from '@prisma/client';

async function updateRecipe(recipeId: number, formData: FormData): Promise<Recipe> {
  const { user } = await validateRequest();
  invariant(user, 'An authorized user is required');

  const image = formData.get('image');
  invariant(image, 'Expected a image file parameter');

  const payload = formData.get('data');
  invariant(typeof payload === 'string', 'Expected a payload parameter');

  const imageUrl = typeof image !== 'string' ? await imageUploadService.upload(image) : undefined;
  const { ingredients, ...data } = JSON.parse(payload) as UpdateRecipePayload;

  const { toCreate, toUpdate, toDelete } = await getIngredientListPayload(recipeId, ingredients);
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

  await updateRecipeIndex(recipe, ingredients);

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);

  return recipe;
}

async function updateRecipeIndex(
  recipe: Recipe,
  ingredients: UpdateRecipePayload['ingredients'],
): Promise<void> {
  const ingredientNames = ingredients.map(i => i.name);

  await elastic.update({
    index: 'recipes',
    id: recipe.id.toString(),
    body: { doc: mapToElastic(recipe, ingredientNames) },
  });
}

async function getIngredientListPayload(
  recipeId: number,
  ingredients: UpdateRecipePayload['ingredients'],
) {
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

function isEqualIngredients(
  ingredient1: UpdateRecipePayload['ingredients'][number],
  ingredient2: UpdateRecipePayload['ingredients'][number],
) {
  const string1 = JSON.stringify(pick(ingredient1, ['id', 'name', 'order', 'unit']));
  const string2 = JSON.stringify(pick(ingredient2, ['id', 'name', 'order', 'unit']));

  return string1 === string2;
}

export { updateRecipe };
