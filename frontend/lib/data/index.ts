import schema from '@/components/new-recipe-form/shema';
import type { GetRecipeResponse, GetRecipesResponse } from '@/types/api';
import { z } from 'zod';

export async function getRecipes(search: string): Promise<GetRecipesResponse> {
  const response = await fetch('https://dummyjson.com/recipes');
  console.log('response :>> ', response);
  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return response.json();
}

export async function getRecipesPreview(
  search: string,
  filters: { [key: string]: string | string[] | undefined }
): Promise<GetRecipesResponse> {
  const testRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
  console.log('testRequest :>> ', testRequest);
  // const test = await testRequest.json();
  // console.log('test :>> ', test);

  const response = await fetch('https://dummyjson.com/recipes');
  console.log('re-trigger', search, filters);

  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return response.json();
}

export async function getRecipe(recipeId: number): Promise<GetRecipeResponse> {
  const response = await fetch('https://dummyjson.com/recipes');
  const json: GetRecipesResponse = await response.json();

  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return json.recipes.find((recipe) => recipeId === recipe.id);
}

export async function getIngredients() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`);
  const ingredients = await response.json();
  console.log('ingredients :>> ', ingredients);
  return ingredients;
}

export async function createRecipe(recipe: z.infer<typeof schema>) {
  const tr = {
    ...recipe,
    ingredients: recipe.ingredients.map((i) => ({ name: i.name, unit: i.quantity })),
    steps: recipe.steps.map((step) => step.description),
  };

  console.log('recipe :>> ', tr);
  const testRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tr),
  });
  console.log('testRequest :>> ', testRequest);
}
