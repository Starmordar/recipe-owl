import Fuse from 'fuse.js';
import { cache } from 'react';

import { searchLimit } from '../config/search-limit';

const getIngredients = cache(async () => {
  const response = await fetch('/data/ingredients.json');
  const data = await response.json();

  return data as Array<string>;
});

async function searchIngredients(
  searchTerm: string,
): Promise<Array<{ id: string; title: string }>> {
  const ingredients = await getIngredients();
  const ingredientsFuse = new Fuse(ingredients, { threshold: 0.3, includeScore: true });
  const result = ingredientsFuse.search(searchTerm);

  return result.slice(0, searchLimit).map(({ item }) => ({ id: item, title: item }));
}

export { searchIngredients };
