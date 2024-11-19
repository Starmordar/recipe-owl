import { Skeleton } from '@/src/shared/ui/skeleton';

function ProfileTabsSkeleton() {
  const cards = new Array<number>(6).fill(0);

  return (
    <main className='page-container pt-2'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
        {cards.map((_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <Skeleton className='h-[25vh] rounded-lg' />
            <div className='space-y-2'>
              <Skeleton className='h-5' />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export { ProfileTabsSkeleton };
