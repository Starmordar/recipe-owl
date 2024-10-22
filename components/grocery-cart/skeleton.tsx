import { Skeleton } from '@/shared/ui/skeleton';

function GroceryCartSekeleton() {
  const cards = new Array<number>(2).fill(0);
  const ingredients = new Array<number>(5).fill(0);

  return (
    <main className='page-container mt-4'>
      <Skeleton className='relative h-6 w-[30vw]' />

      {cards.map((_, i) => (
        <div key={i} className='flex flex-col'>
          <div className='flex flex-row py-4 space-y-0 gap-4'>
            <Skeleton className='relative min-w-[20vw] w-[20vw] h-[20vw]' />

            <Skeleton className='relative w-full pr-4' />
          </div>
          <div className='grid py-4 pt-0 space-y-2 divide-y'>
            {ingredients.map((_, i) => (
              <div key={i} className='py-2 space-y-2'>
                <Skeleton className='relative w-[80vw] h-5' />
                <Skeleton className='relative w-[20vw] h-4' />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

export default GroceryCartSekeleton;
