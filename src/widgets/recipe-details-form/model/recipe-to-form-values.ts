import type { FormValues } from './schema';
import type { RecipeDetails } from '@/src/entities/recipe';

function recipeToFormValues(recipe: RecipeDetails): FormValues {
  const steps = recipe.steps.map(step => ({ description: step }));
  return { ...recipe, image: recipe.imageUrl, steps } as FormValues;
}

export { recipeToFormValues };
