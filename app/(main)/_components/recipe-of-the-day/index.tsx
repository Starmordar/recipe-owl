import { getRecipeOfTheDay } from '../../actions';

import RecipeContent from './components/recipe-content';

async function RecipeOfTheDay() {
  const recipe = await getRecipeOfTheDay();
  if (!recipe) return null;

  return <RecipeContent recipe={recipe} />;
}

export default RecipeOfTheDay;
