import RecipeDetailsForm from '.';
import { getRecipe } from '@/lib/data';
import { recipeToFormValues } from './utils/recipeToFormValues';

interface RecipeProps {
  recipeId: number;
}

async function EditRecipe({ recipeId }: RecipeProps) {
  const recipe = await getRecipe(recipeId);
  if (!recipe) return null; // TODO: Custom Handler

  return (
    <div className="container flex flex-col gap-4">
      <RecipeDetailsForm recipeId={recipe.id} initialValues={recipeToFormValues(recipe)} />
    </div>
  );
}

export default EditRecipe;
