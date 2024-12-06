import { getRecipeOfTheDay } from '../../api/get-recipe-of-the-day';

import { RecipeContent } from './recipe-content';

async function RecipeOfTheDay() {
  const recipe = await getRecipeOfTheDay();
  await new Promise(resolve => setTimeout(resolve, 50000));

  if (!recipe) return null;

  return <RecipeContent recipe={recipe} />;
}

export { RecipeOfTheDay };
