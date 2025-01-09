import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getRecipeDetails } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { RecipeDetailsForm } from '@/src/widgets/recipe-details-form';

async function EditRecipePage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeDetails(Number(params.slug));
  if (!recipe) return notFound();

  const t = await getTranslations('RecipeForm');

  return (
    <RecipeDetailsForm
      title={t('updateTitle')}
      prevUrl={publicUrls.recipe(params.slug)}
      recipe={recipe}
    />
  );
}

export { EditRecipePage };
