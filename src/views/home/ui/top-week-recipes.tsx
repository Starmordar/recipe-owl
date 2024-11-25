import { getWeekPopularRecipes } from '@/src/entities/recipe/api/get-week-popular-recipe';

import { RecipesCarousel } from './recipes-carousel';

async function TopWeekRecipes() {
  const recipes = await getWeekPopularRecipes();
  if (recipes.length === 0) return null;

  return <RecipesCarousel sectionTitle='Popular Recipes This Week' recipes={recipes} />;
}

export { TopWeekRecipes };
