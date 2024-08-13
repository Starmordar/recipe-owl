'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import schema from '@/components/new-recipe-form/shema';

export async function getIngredients() {
  const ingredients = await prisma.ingredient.findMany({
    distinct: ['name'],
  });

  return ingredients;
}

export async function createRecipe(recipe: z.infer<typeof schema>) {
  const result = await prisma.recipe.create({
    data: {
      title: recipe.title,
      description: recipe.description,
      steps: recipe.steps.map((r) => r.description),
      ingredients: {
        create: recipe.ingredients.map((r) => ({ name: r.name, unit: r.quantity })),
      },
    },
  });

  console.log('result :>> ', result);
  return result;
}

export async function getRecipes() {
  const result = await prisma.recipe.findMany();

  console.log('result :>> ', result);
  return result;
}
