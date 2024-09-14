import { redirect } from 'next/navigation';

import { validateRequest } from '@/app/(auth)/actions';
import RecipeDetailsFormHeader from '@/components/layout/recipe-details-form-header';
import RecipeDetailsForm from '@/components/recipe-details-form';
import { publicUrls } from '@/config/url';

async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return (
    <>
      <RecipeDetailsFormHeader title='Create Recipe' prevUrl={publicUrls.recipes} />

      <main className='page-container'>
        <RecipeDetailsForm />
      </main>
    </>
  );
}

export default Page;
