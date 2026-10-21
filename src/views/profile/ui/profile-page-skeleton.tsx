import { Skeleton } from '@/src/shared/ui/skeleton';

import { ProfileTabsSkeleton } from './profile-tabs-skeleton';

function ProfilePageSkeleton() {
  return (
    <>
      <div className='container lg:max-w-6xl lg:px-8 flex justify-end gap-x-3 py-2'>
        <Skeleton className='h-7 w-7 rounded-full' />
        <Skeleton className='h-7 w-7 rounded-full' />
      </div>

      <main className='page-container lg:max-w-6xl lg:px-8 pt-2 md:pt-4 pb-0'>
        <div className='flex items-center gap-x-4'>
          <Skeleton className='h-20 w-20 shrink-0 rounded-full' />
          <div className='flex flex-col gap-y-2'>
            <Skeleton className='h-6 md:h-7 w-40' />
            <Skeleton className='h-4 w-36' />
            <Skeleton className='mt-1 h-8 w-28 rounded-full' />
          </div>
        </div>

        <div>
          <div className='flex h-10 border-b'>
            <Skeleton className='m-auto h-5 w-20 md:mx-4' />
            <Skeleton className='m-auto h-5 w-20 md:mx-4' />
          </div>
          <ProfileTabsSkeleton />
        </div>
      </main>
    </>
  );
}

export { ProfilePageSkeleton };
