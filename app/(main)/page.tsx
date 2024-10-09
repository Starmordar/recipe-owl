import LatestRecipes from './_components/latest-recipes';
import RecipeOfTheDay from './_components/recipe-of-the-day';
import RecipesCategory from './_components/recipes-category';

function Page() {
  return (
    <main className='page-container px-0 overflow-x-hidden'>
      <RecipeOfTheDay />
      <LatestRecipes />
      <RecipesCategory />
    </main>
  );
}

export default Page;
