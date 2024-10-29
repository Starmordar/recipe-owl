import { Skeleton } from '@/src/shared/ui/skeleton';

function TabsContentSkeleton() {
  const cards = new Array<number>(3).fill(0);
  const ingredients = new Array<number>(6).fill(0);

  return (
    <div className='absolute inset-0 overflow-x-hidden px-4 pt-2 pb-4 space-y-4'>
      {cards.map((_, cardI) => (
        <div key={cardI} className='flex flex-col p-4 shadow border rounded-xl'>
          <div className='flex gap-4 mr-4'>
            <Skeleton className='min-w-[15vw] w-[15vw] h-[15vw]' />

            <Skeleton className='w-[50vw] h-6' />
          </div>

          <div className='divide-y'>
            {ingredients.map((_, i) => (
              <div key={i} className='flex py-2.5 justify-between'>
                <div className='flex gap-x-2'>
                  <Skeleton className='w-[30vw] h-5' />
                  <Skeleton className='w-[15vw] h-5' />
                </div>

                <Skeleton className='self-end h-5 w-5' />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { TabsContentSkeleton };
