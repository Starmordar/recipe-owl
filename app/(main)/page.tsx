import LatestRecipes from './_components/latest-recipes';
import RecipesCategory from './_components/recipes-category';
import TodaysRecipe from "./_components/today's-recipe";

function Page() {
  return (
    <main className='page-container px-0 overflow-x-hidden'>
      <TodaysRecipe />
      <div className='h-[12vh]'></div>
      <LatestRecipes />
      <RecipesCategory />
    </main>
  );
}

export default Page;
