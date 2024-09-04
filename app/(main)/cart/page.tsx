import { Suspense } from 'react';

import GroceryCart from '@/components/grocery-cart';
import GroceryCartSekeleton from '@/components/grocery-cart/skeleton';

function Page() {
  return (
    <main className='page-container'>
      <h1 className='text-xl font-bold'>Grocery Cart</h1>

      <Suspense fallback={<GroceryCartSekeleton />}>
        <GroceryCart />
      </Suspense>
    </main>
  );
}

export default Page;
