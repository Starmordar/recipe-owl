import type { FormValues } from '../constants/shema';
import type { RecipeDetails } from '@/types/api';

export function recipeToFormValues(recipe: RecipeDetails): FormValues {
  const steps = recipe.steps.map(step => ({ description: step }));
  return { ...recipe, image: recipe.imageUrl, steps } as FormValues;
}
