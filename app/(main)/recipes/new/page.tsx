import { redirect } from 'next/navigation';

import { validateRequest } from '@/app/(auth)/actions';
import RecipeDetailsForm from '@/components/recipe-details-form';
import { publicUrls } from '@/config/url';

async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <RecipeDetailsForm title='Create Recipe' prevUrl={publicUrls.recipes} />;
}

export default Page;
