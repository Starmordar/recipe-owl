import type { IngredientDetails } from '@/types/api';

export async function getIngredients(searchTerm: string): Promise<Array<IngredientDetails>> {
  const response = await fetch(`/api/ingredients/?search=${searchTerm}`);
  const ingredients = await response.json();

  return ingredients;
}
