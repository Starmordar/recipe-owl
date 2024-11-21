import { LatestRecipes } from './latest-recipes';
import { RecentlyViewed } from './recently-viewed';
import { RecipeOfTheDay } from './recipe-of-the-day';
import { RecipesCategory } from './recipes-category';

function HomePage() {
  return (
    <main className='page-container px-0 overflow-x-hidden'>
      <RecipeOfTheDay />
      <LatestRecipes />
      <RecentlyViewed />
      <RecipesCategory />
    </main>
  );
}

export { HomePage };
