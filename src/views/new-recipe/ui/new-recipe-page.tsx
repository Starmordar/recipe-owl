import { redirect } from 'next/navigation';

import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { RecipeDetailsForm } from '@/src/widgets/recipe-details-form';

async function NewRecipePage() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <RecipeDetailsForm title='Add Recipe' prevUrl={publicUrls.recipes} />;
}

export { NewRecipePage };
