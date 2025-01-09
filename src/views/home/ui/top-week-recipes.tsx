import { getTranslations } from 'next-intl/server';

import { getMostPopularRecipes } from '../api/get-most-popular-recipes';

import { RecipesCarousel } from './recipes-carousel';

async function TopWeekRecipes() {
  const recipes = await getMostPopularRecipes();
  if (recipes.length === 0) return null;

  const t = await getTranslations('HomePage');
  return <RecipesCarousel sectionTitle={t('popularThisWeek')} recipes={recipes} />;
}

export { TopWeekRecipes };
