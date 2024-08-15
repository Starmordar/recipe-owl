import type { GetIngredientsResponse, GetRecipeResponse, GetRecipesResponse } from '@/types/api';
import type { FormValues as RecipeFormValues } from '@/components/recipe-details-form/constants/shema';
import type { Recipe } from '@/types/recipe';

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${recipeId}`, {
    cache: 'no-cache',
  });
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

export async function getIngredients(searchTerm: string): Promise<GetIngredientsResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ingredients/?search=${searchTerm}`
  );
  const ingredients = await response.json();

  return ingredients;
}

export async function createRecipe(formValues: RecipeFormValues): Promise<Recipe> {
  const edited = { ...formValues, steps: formValues.steps.map((s) => s.description) };
  const { image, ...data } = edited;

  const formData = new FormData();
  formData.append('image', image);
  formData.append('data', JSON.stringify(data));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to Create Recipe');
  }

  return response.json();
}

export async function updateRecipe(
  recipeId: number,
  formValues: RecipeFormValues
): Promise<Recipe> {
  const edited = { ...formValues, steps: formValues.steps.map((s) => s.description) };
  const { image, ...data } = edited;

  const formData = new FormData();
  formData.append('image', image);
  formData.append('data', JSON.stringify(data));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipe/${recipeId}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to Update Recipe');
  }

  return response.json();
}
