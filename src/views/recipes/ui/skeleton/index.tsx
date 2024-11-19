import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipesPageSkeleton() {
  const cards = new Array<number>(10).fill(0);

  return (
    <>
      <div className='px-4 py-2 space-y-2'>
        <Skeleton className='h-8' />
        <div className='flex gap-x-2'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-6 w-52' />
        </div>
      </div>
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
    </>
  );
}

export { RecipesPageSkeleton };
