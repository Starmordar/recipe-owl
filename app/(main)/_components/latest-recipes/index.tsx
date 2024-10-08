import { getLatestRecipes } from '../../actions';

import RecipeCard from './components/latest-recipe';

async function LatestRecipes() {
  const latestRecipes = await getLatestRecipes();
  if (latestRecipes.length === 0) return null;

  return (
    <section className='page-container gap-y-2'>
      <h2 className='text-xl font-semibold'>Our Latest Recipes</h2>
      <div className='flex flex-nowrap gap-x-3 pb-2 overflow-x-auto'>
        {latestRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}

export default LatestRecipes;
