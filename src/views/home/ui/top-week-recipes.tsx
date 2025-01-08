import { getMostPopularRecipes } from '../api/get-most-popular-recipes';

import { RecipesCarousel } from './recipes-carousel';

async function TopWeekRecipes() {
  const recipes = await getMostPopularRecipes();
  if (recipes.length === 0) return null;

  return <RecipesCarousel sectionTitle='Popular Recipes This Week' recipes={recipes} />;
}

export { TopWeekRecipes };
