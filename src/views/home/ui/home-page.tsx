import { LatestRecipes } from './latest-recipes';
import { RecipeOfTheDay } from './recipe-of-the-day';
import { RecipesCategory } from './recipes-category';

function HomePage() {
  return (
    <main className='page-container px-0 overflow-x-hidden'>
      <RecipeOfTheDay />
      <LatestRecipes />
      <RecipesCategory />
    </main>
  );
}

export { HomePage };
