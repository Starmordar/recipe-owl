import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipeDetailsPageSkeleton() {
  const ingredients = new Array<number>(8).fill(0);
  const steps = new Array<number>(4).fill(0);

  return (
    <main className='flex flex-1 flex-col pb-6 lg:pb-12'>
      {/* From `lg` up the page header takes its own row above the content. */}
      <div className='hidden h-14 border-b lg:block' />

      <div className='lg:mx-auto lg:grid lg:w-full lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:px-8 lg:pt-8'>
        <div className='md:max-lg:container md:max-lg:pt-16 lg:order-last'>
          <Skeleton className='w-full aspect-square max-h-[50vh] rounded-none md:aspect-video md:rounded-lg lg:aspect-[4/3] lg:max-h-none lg:rounded-2xl' />
        </div>

        <div className='relative -mt-5 rounded-t-2xl bg-background pt-5 max-lg:container md:mt-0 md:rounded-none md:pt-4 lg:pt-0'>
          <div className='flex flex-col gap-y-3 lg:gap-y-4'>
            <Skeleton className='h-8 w-[250px] lg:h-11 lg:w-3/4' />
            <Skeleton className='h-5 w-[200px]' />
            <Skeleton className='h-20' />
          </div>
        </div>
      </div>

      <div className='container flex flex-col gap-8 pt-8 lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-start lg:gap-x-12 lg:px-8 lg:pt-12'>
        <div className='flex flex-col gap-y-3 lg:rounded-2xl lg:border lg:p-6'>
          <Skeleton className='h-7 w-[150px] lg:h-8' />

          <div className='flex flex-col'>
            {ingredients.map((_, index) => (
              <div key={index} className='flex justify-between py-3'>
                <Skeleton className='h-6 w-[55vw] lg:w-1/2' />
                <Skeleton className='h-6 w-[20vw] lg:w-1/5' />
              </div>
            ))}
          </div>
        </div>

        {/* On smaller screens the method starts below the fold, so it only shows from `lg` up. */}
        <div className='hidden flex-col gap-y-2 lg:flex'>
          <Skeleton className='h-8 w-[150px]' />

          <div className='flex flex-col'>
            {steps.map((_, index) => (
              <div key={index} className='flex gap-x-3 py-4'>
                <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
                <Skeleton className='h-20 flex-1' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export { RecipeDetailsPageSkeleton };
