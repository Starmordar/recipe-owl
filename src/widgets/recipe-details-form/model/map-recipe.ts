import type { FormValues } from './shema';
import type { UpdateRecipePayload } from '@/src/entities/recipe';

function mapRecipe(values: FormValues): UpdateRecipePayload {
  return {
    title: values.title,
    description: values.description,
    source: values.source,
    image: values.image,
    ingredients: values.ingredients.map((ingredient, i) => ({ ...ingredient, order: i })),
    steps: values.steps.map(s => s.description),
  };
}

export { mapRecipe };
