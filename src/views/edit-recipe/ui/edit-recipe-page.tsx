import { notFound } from 'next/navigation';

import { getRecipeDetails } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { RecipeDetailsForm } from '@/src/widgets/recipe-details-form';

async function EditRecipePage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeDetails(Number(params.slug));
  if (!recipe) return notFound();

  return (
    <RecipeDetailsForm
      title='Edit Recipe'
      prevUrl={publicUrls.recipe(params.slug)}
      recipe={recipe}
    />
  );
}

export { EditRecipePage };
