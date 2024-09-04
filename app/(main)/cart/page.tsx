import { Suspense } from 'react';

import GroceryCart from '@/components/grocery-cart';
import GroceryCartSekeleton from '@/components/grocery-cart/skeleton';

function Page() {
  return (
    <main className='page-container'>
      <Suspense fallback={<GroceryCartSekeleton />}>
        <GroceryCart />
      </Suspense>
    </main>
  );
}

export default Page;
