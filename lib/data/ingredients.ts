import Fuse from 'fuse.js';
import { cache } from 'react';

const getIngredients = cache(async () => {
  const response = await fetch('/data/ingredients.json');
  const data = await response.json();

  return data as Array<string>;
});

export async function searchIngredients(
  searchTerm: string,
): Promise<Array<{ id: string; title: string }>> {
  const ingredients = await getIngredients();
  const ingredientsFuse = new Fuse(ingredients, { threshold: 0.3, includeScore: true });
  const result = ingredientsFuse.search(searchTerm);

  console.log('result :>> ', result);

  const resultsLimit = 50;
  return result.slice(0, resultsLimit).map(({ item }) => ({ id: item, title: item }));
}
