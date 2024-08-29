import type { GetIngredientsResponse } from '@/types/api';

export async function getIngredients(searchTerm: string): Promise<GetIngredientsResponse> {
  const response = await fetch(`/api/ingredients/?search=${searchTerm}`);
  const ingredients = await response.json();

  return ingredients;
}
