import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipeDetailsPageSkeleton() {
  const ingredients = new Array<number>(8).fill(0);

  return (
    <main className='flex flex-1 flex-col pb-6'>
      <div className='md:container md:pt-16'>
        <Skeleton className='w-full aspect-square max-h-[50vh] rounded-none md:aspect-video md:rounded-lg' />
      </div>

      <div className='relative -mt-5 rounded-t-2xl bg-background md:mt-0 md:rounded-none'>
        <div className='container flex flex-col gap-8 pt-5 md:pt-4'>
          <div className='flex flex-col gap-y-3'>
            <Skeleton className='h-8 w-[250px]' />
            <Skeleton className='h-5 w-[200px]' />
            <Skeleton className='h-20' />
          </div>

          <div className='flex flex-col gap-y-3'>
            <Skeleton className='h-7 w-[150px]' />

            <div className='flex flex-col'>
              {ingredients.map((_, index) => (
                <div key={index} className='flex justify-between py-3'>
                  <Skeleton className='h-6 w-[55vw]' />
                  <Skeleton className='h-6 w-[20vw]' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { RecipeDetailsPageSkeleton };
