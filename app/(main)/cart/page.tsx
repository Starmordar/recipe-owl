import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { validateRequest } from '@/app/(auth)/actions';
import GroceryCart from '@/components/grocery-cart';
import GroceryCartSekeleton from '@/components/grocery-cart/skeleton';
import { publicUrls } from '@/config/url';

import PageHeader from './_components/page-header';

async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return (
    <>
      <PageHeader userId={user.id} />
      <main className='page-container mt-4'>
        <Suspense fallback={<GroceryCartSekeleton />}>
          <GroceryCart />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
