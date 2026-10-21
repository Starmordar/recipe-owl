import { getTranslations } from 'next-intl/server';

import { ingredientsCategory, tagsCategories } from '@/src/entities/recipe';

type Filters = Record<string, string | Array<string> | undefined>;

interface RecipesHeadingProps {
  search: string;
  filters: Filters;
}

async function RecipesHeading({ search, filters }: RecipesHeadingProps) {
  const { title, subtitle } = await getHeadingText(search, filters);

  return (
    <div className='space-y-0.5'>
      <h1 className='text-xl md:text-2xl font-semibold break-words line-clamp-2'>{title}</h1>
      {subtitle && <p className='text-sm text-muted-foreground line-clamp-2'>{subtitle}</p>}
    </div>
  );
}

async function getHeadingText(search: string, filters: Filters) {
  const t = await getTranslations('RecipesPage');
  const tTags = await getTranslations('RecipeTags');

  const tagName = (tag: string) => (tTags.has(`Items.${tag}`) ? tTags(`Items.${tag}`) : tag);

  const ingredients = toArray(filters[ingredientsCategory]);
  const tags = tagsCategories.flatMap(category =>
    toArray(filters[category]).map(tag => ({ category, tag })),
  );
  const filterNames = [...ingredients, ...tags.map(({ tag }) => tagName(tag))].join(' · ');

  if (search.trim()) {
    return { title: t('searchResultsTitle', { search: search.trim() }), subtitle: filterNames };
  }

  // A single tag is what the "See all" links on the home page open, so it gets the same heading.
  if (tags.length === 1 && ingredients.length === 0) {
    const [{ category, tag }] = tags;
    return {
      title: tTags.has(`Descriptions.${tag}`) ? tTags(`Descriptions.${tag}`) : tagName(tag),
      subtitle: `${tTags(`Categories.${category}`)} · ${tagName(tag)}`,
    };
  }

  if (filterNames) return { title: t('filteredRecipesTitle'), subtitle: filterNames };
  return { title: t('allRecipesTitle'), subtitle: '' };
}

function toArray(value: string | Array<string> | undefined): Array<string> {
  if (!value) return [];
  return typeof value === 'string' ? [value] : value;
}

export { RecipesHeading };
