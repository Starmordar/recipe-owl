import { getLatestRecipes } from '../api/get-latest-recipes';

import { RecipePreviewSection } from './recipe-preview';

async function LatestRecipes() {
  const recipes = await getLatestRecipes();
  if (recipes.length === 0) return null;

  return <RecipePreviewSection sectionTitle='Our Latest Recipes' recipes={recipes} />;
}

export { LatestRecipes };
