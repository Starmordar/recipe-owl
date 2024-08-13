import type { GetRecipeResponse, GetRecipesResponse } from '@/types/api';
import prisma from '../prisma';

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
