import type { FormValues } from './schema';
import type { UpdateRecipePayload } from '@/src/entities/recipe';

function formValuesToPayload(values: FormValues): UpdateRecipePayload {
  return {
    title: values.title,
    description: values.description,
    source: values.source,
    image: values.image,
    cookTime: values.cookTime,
    tags: values.tags,
    ingredients: values.ingredients.map((ingredient, i) => ({ ...ingredient, order: i })),
    steps: values.steps.map(s => s.description),
  };
}

function valuesToFormData(values: FormValues): FormData {
  const { image, ...data } = formValuesToPayload(values);

  const formData = new FormData();
  formData.append('image', image);
  formData.append('data', JSON.stringify(data));

  return formData;
}

export { valuesToFormData };
