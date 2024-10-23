import { redirect } from 'next/navigation';

import RecipeDetailsForm from '@/components/recipe-details-form';
import { publicUrls } from '@/config/url';
import { validateRequest } from '@/entities/session';

async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <RecipeDetailsForm title='Add Recipe' prevUrl={publicUrls.recipes} />;
}

export default Page;
