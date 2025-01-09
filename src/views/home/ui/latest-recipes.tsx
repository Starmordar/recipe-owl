import { getTranslations } from 'next-intl/server';

import { getLatestRecipes } from '../api/get-latest-recipes';

import { RecipePreviewSection } from './recipe-preview';

async function LatestRecipes() {
  const recipes = await getLatestRecipes();
  if (recipes.length === 0) return null;

  const t = await getTranslations('HomePage');

  return <RecipePreviewSection sectionTitle={t('latestRecipes')} recipes={recipes} />;
}

export { LatestRecipes };
