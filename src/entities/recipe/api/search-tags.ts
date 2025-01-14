import Fuse from 'fuse.js';
import { useTranslations } from 'next-intl';
import { cache } from 'react';

interface RecipeTag {
  type: { title: string; value: string };
  categories: Array<{ title: string; value: string }>;
}

const getRecipeTags = cache(async () => {
  const response = await fetch('/data/recipe-tags.json');
  const data: Array<{ type: string; categories: Array<string> }> = await response.json();

  return data.flatMap(tag => tag.categories.map(category => ({ category, type: tag.type })));
});

function searchResultToTags(
  result: Array<{
    categoryTitle: string;
    categoryValue: string;
    typeValue: string;
    typeTitle: string;
  }>,
): Array<RecipeTag> {
  const tagGroup = Object.groupBy(result, item => item.typeTitle);

  return Object.entries(tagGroup).flatMap(([type, categories]) => {
    if (!categories || categories.length === 0) return [];

    const { typeTitle, typeValue } = categories[0];
    return {
      type: { title: typeTitle, value: typeValue },
      categories: categories?.map(c => ({ title: c.categoryTitle, value: c.categoryValue })),
    };
  });
}

async function searchTags(
  searchTerm: string,
  t: ReturnType<typeof useTranslations>,
): Promise<Array<RecipeTag>> {
  const tags = await getRecipeTags();
  const i18nTags = tags.map(({ type, category }) => ({
    typeTitle: t(`RecipeTags.Categories.${type}`),
    typeValue: type,
    categoryTitle: t(`RecipeTags.Items.${category}`),
    categoryValue: category,
  }));

  if (!searchTerm) return searchResultToTags(i18nTags);

  const ingredientsFuse = new Fuse(i18nTags, {
    threshold: 0.3,
    includeScore: true,
    keys: ['category'],
  });

  const result = ingredientsFuse.search(searchTerm);
  return searchResultToTags(result.map(({ item }) => item));
}

export { searchTags };
