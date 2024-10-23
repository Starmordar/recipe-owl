import { redirect } from 'next/navigation';

import RecipeDetailsForm from '@/components/recipe-details-form';
import { validateRequest } from '@/entities/session';
import { publicUrls } from '@/shared/config/url';

async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <RecipeDetailsForm title='Add Recipe' prevUrl={publicUrls.recipes} />;
}

export default Page;
