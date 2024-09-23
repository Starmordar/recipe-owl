import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { validateRequest } from '@/app/(auth)/actions';
import GroceryCart from '@/components/grocery-cart';
import GroceryCartSekeleton from '@/components/grocery-cart/skeleton';
import { publicUrls } from '@/config/url';
import useGroceryCart from '@/hooks/useGroceryCart';

import PageHeader from './_components/page-header';
import { connectUserWithCart, getAllAvailableCarts } from './actions';

interface PageProps {
  searchParams: { shareToken?: string };
}

async function Page({ searchParams: { shareToken } }: PageProps) {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  if (shareToken) {
    await connectUserWithCart(user.id, shareToken);
  }

  const { getCart } = useGroceryCart({ shareToken });
  const cartDetails = await getCart();

  const availableCarts = await getAllAvailableCarts(user.id);

  return (
    <>
      <PageHeader userId={user.id} cart={cartDetails?.cart} availableCarts={availableCarts} />

      <main className='page-container mt-4'>
        <Suspense fallback={<GroceryCartSekeleton />}>
          <GroceryCart shareToken={shareToken} />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
