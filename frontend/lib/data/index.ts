import schema from '@/components/new-recipe-form/shema';
import type { GetRecipeResponse, GetRecipesResponse } from '@/types/api';
import { z } from 'zod';

export async function getRecipes(search: string): Promise<GetRecipesResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`, {});
  const data = await response.json();
  console.log('response :>> ', response);
  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return { recipes: data };
}

export async function getRecipesPreview(
  search: string,
  filters: { [key: string]: string | string[] | undefined }
): Promise<GetRecipesResponse> {
  // const test = await testRequest.json();
  // console.log('test :>> ', test);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`, {});
  const data = await response.json();
  // const response = await fetch('https://dummyjson.com/recipes');
  console.log('re-trigger', search, filters);

  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return { recipes: data };
}

export async function getRecipe(recipeId: number): Promise<GetRecipeResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${recipeId}`);
  console.log(
    '`${process.env.NEXT_PUBLIC_API_URL}/recipe/${recipeId}` :>> ',
    `${process.env.NEXT_PUBLIC_API_URL}/recipe/${recipeId}`
  );
  const data = await response.json();
  console.log('object :>> ', data);

  //   if (response.ok) {
  //     throw new Error('Failed to fetch data');
  //   }

  return data;
}

export async function getIngredients() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`);
  const ingredients = await response.json();
  console.log('ingredients :>> ', ingredients);
  return ingredients;
}

export async function createRecipe(recipe: z.infer<typeof schema>) {
  const edited = { ...recipe, steps: recipe.steps.map((s) => s.description) };
  const { image, ...data } = edited;

  const formData = new FormData();
  formData.append('image', image);
  formData.append('data', JSON.stringify(data));
  console.log('formData :>> ', formData);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`, {
    method: 'POST',
    body: formData,
  });

  console.log('response :>> ', response);
}
