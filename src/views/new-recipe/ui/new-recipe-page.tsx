import { getLocale, getTranslations } from 'next-intl/server';

import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { redirect } from '@/src/shared/i18n/routing';
import { RecipeDetailsForm } from '@/src/widgets/recipe-details-form';

async function NewRecipePage() {
  const { user } = await validateRequest();
  if (user === null) redirect({ href: publicUrls.signIn, locale: await getLocale() });

  const t = await getTranslations('RecipeFormPage');
  return <RecipeDetailsForm title={t('createTitle')} />;
}

export { NewRecipePage };
