import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { RecipeDetailsForm } from '@/src/widgets/recipe-details-form';

async function NewRecipePage() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  const t = await getTranslations('RecipeFormPage');
  return <RecipeDetailsForm title={t('createTitle')} />;
}

export { NewRecipePage };
