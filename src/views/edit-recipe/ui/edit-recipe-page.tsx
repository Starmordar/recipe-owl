import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

import { getRecipeDetails } from '@/src/entities/recipe';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { redirect } from '@/src/shared/i18n/routing';
import { RecipeDetailsForm } from '@/src/widgets/recipe-details-form';

async function EditRecipePage({ params }: { params: { slug: string } }) {
  const { user } = await validateRequest();
  if (user === null) redirect({ href: publicUrls.signIn, locale: await getLocale() });

  const recipe = await getRecipeDetails(Number(params.slug));
  if (!recipe || recipe.createdById !== user.id) return notFound();

  const t = await getTranslations('RecipeFormPage');

  return (
    <RecipeDetailsForm
      title={t('updateTitle')}
      prevUrl={publicUrls.recipe(params.slug)}
      recipe={recipe}
    />
  );
}

export { EditRecipePage };
