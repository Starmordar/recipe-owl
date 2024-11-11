import Fuse from 'fuse.js';
import { cache } from 'react';

interface RecipeTag {
  type: string;
  categories: Array<string>;
}

const getRecipeTags = cache(async () => {
  const response = await fetch('/data/recipe-tags.json');
  const data: Array<RecipeTag> = await response.json();

  return data.flatMap(tag => tag.categories.map(category => ({ category, type: tag.type })));
});

function searchResultToTags(result: Array<{ category: string; type: string }>): Array<RecipeTag> {
  const tagGroup = Object.groupBy(result, item => item.type);

  return Object.entries(tagGroup).flatMap(([type, categories]) => {
    if (!categories) return [];
    return { type, categories: categories?.map(c => c.category) };
  });
}

async function searchTags(searchTerm: string): Promise<Array<RecipeTag>> {
  const tags = await getRecipeTags();
  if (!searchTerm) return searchResultToTags(tags);

  const ingredientsFuse = new Fuse(tags, {
    threshold: 0.3,
    includeScore: true,
    keys: ['category'],
  });

  const result = ingredientsFuse.search(searchTerm);
  return searchResultToTags(result.map(({ item }) => item));
}

export { searchTags };
