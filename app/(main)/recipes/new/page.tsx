import { redirect } from 'next/navigation';

import RecipeDetailsForm from '@/src/components/recipe-details-form';
import { validateRequest } from '@/src/entities/session';
import { publicUrls } from '@/src/shared/config/url';

async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <RecipeDetailsForm title='Add Recipe' prevUrl={publicUrls.recipes} />;
}

export default Page;
