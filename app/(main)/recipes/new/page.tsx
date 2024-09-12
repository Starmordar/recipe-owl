import RecipeDetailsFormHeader from '@/components/layout/recipe-details-form-header';
import RecipeDetailsForm from '@/components/recipe-details-form';
import { publicUrls } from '@/config/url';

async function Page() {
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
