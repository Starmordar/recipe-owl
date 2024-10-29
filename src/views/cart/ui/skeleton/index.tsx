import { Skeleton } from '@/src/shared/ui/skeleton';

import { TabsContentSkeleton } from '../cart-tabs/skeleton';

function CartPageSkeleton() {
  return (
    <>
      <Skeleton className='h-7 w-[40vw] my-4 ml-4' />

      <div className='flex justify-around'>
        <Skeleton className='h-7 w-[30vw]' />
        <Skeleton className='h-7 w-[30vw]' />
      </div>

      <div className='page-container relative'>
        <TabsContentSkeleton />
      </div>
    </>
  );
}

export { CartPageSkeleton };
