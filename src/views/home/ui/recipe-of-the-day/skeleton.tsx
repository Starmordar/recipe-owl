import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipeOfTheDaySkeleton() {
  return (
    <section className='relative md:container md:min-h-[28rem] lg:min-h-[32rem] md:grid md:border-b grid-cols-4 items-center'>
      <div className='relative w-full h-[55vh] md:relative md:h-full col-span-2 order-2'>
        <Skeleton className='w-full h-[55vh]' />
      </div>

      <div className='hidden md:flex flex-col gap-y-4 pr-4 lg:pr-8 py-6 justify-center col-span-2'>
        <Skeleton className='h-6 w-[80px]'></Skeleton>
        <Skeleton className='h-10 w-1/2'></Skeleton>
        <Skeleton className='h-28' />

        <Skeleton className='h-6 w-[100px] mt-4' />
        <Skeleton className='h-8 w-[180px]' />
      </div>

      <div className='md:hidden flex justify-center'>
        <Skeleton className='relative h-32 transform -translate-y-10 -mb-6 flex flex-col p-4 min-w-96 mx-6 rounded-lg bg-orange-100 z-100' />
      </div>
    </section>
  );
}

export { RecipeOfTheDaySkeleton };
