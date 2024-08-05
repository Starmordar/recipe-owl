import type { GetRecipesResponse } from '@/types/api';

export async function getRecipes(search: string): Promise<GetRecipesResponse> {
  const response = await fetch('https://dummyjson.com/recipes');
  console.log('response :>> ', response);
  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return response.json();
}

export async function getRecipesPreview(search: string): Promise<GetRecipesResponse> {
  const response = await fetch('https://dummyjson.com/recipes');

  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return response.json();
}
