import type { FormValues } from '../constants/shema';
import type { Recipe } from '@/types/recipe';

export function recipeToFormValues(recipe: Recipe): FormValues {
  const steps = recipe.steps.map(step => ({ description: step }));

  return { ...recipe, image: recipe.imageUrl, steps };
}
