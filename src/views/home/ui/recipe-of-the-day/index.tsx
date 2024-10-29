import { getRecipeOfTheDay } from '../../model/get-recipe-of-the-day';

import { RecipeContent } from './recipe-content';

async function RecipeOfTheDay() {
  const recipe = await getRecipeOfTheDay();
  if (!recipe) return null;

  return <RecipeContent recipe={recipe} />;
}

export { RecipeOfTheDay };
