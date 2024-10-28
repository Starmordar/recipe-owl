import { notFound } from 'next/navigation';

import RecipeDetailsForm from '@/src/components/recipe-details-form';
import { getRecipeDetails } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';

async function Page({ params }: { params: { slug: string } }) {
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

export default Page;
