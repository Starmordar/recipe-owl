import { getRecipeDetails } from '@/lib/data/recipe';

import RecipeForm, { RecipeFormProps } from './components/recipe-form';
import { recipeToFormValues } from './utils/recipeToFormValues';

interface RecipeProps {
  recipeId?: number;
}

async function RecipeDetailsForm({ recipeId }: RecipeProps) {
  const formProps = await getFormProps();

  async function getFormProps(): Promise<RecipeFormProps> {
    if (typeof recipeId !== 'number') return {};

    const recipe = await getRecipeDetails(recipeId);
    if (!recipe) return {};

    return { recipeId: recipe.id, initialValues: recipeToFormValues(recipe) };
  }

  return <RecipeForm {...formProps} />;
}

export default RecipeDetailsForm;
