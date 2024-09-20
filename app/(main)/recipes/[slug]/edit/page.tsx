import { notFound } from 'next/navigation';

import RecipeDetailsForm from '@/components/recipe-details-form';
import { publicUrls } from '@/config/url';
import { getRecipeDetails } from '@/lib/data/recipe';

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
