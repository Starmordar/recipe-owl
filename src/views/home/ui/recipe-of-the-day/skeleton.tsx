import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipeOfTheDaySkeleton() {
  return (
    <section className='relative md:container md:grid md:grid-cols-2 md:items-center md:gap-x-8 md:pt-8 lg:max-w-6xl lg:gap-x-10 lg:px-8'>
      <div className='relative w-full order-2'>
        <Skeleton className='w-full h-[45vh] md:h-auto md:aspect-[4/3] md:rounded-2xl' />
      </div>

      <div className='hidden md:flex flex-col gap-y-3 lg:gap-y-4'>
        <Skeleton className='h-5 w-32' />
        <Skeleton className='h-10 lg:h-12 w-3/4' />
        <Skeleton className='h-6 w-1/2' />
        <Skeleton className='hidden lg:block h-[4.5rem]' />
        <Skeleton className='h-5 w-40' />
        <Skeleton className='h-11 w-36' />
      </div>

      <div className='relative -mt-5 flex flex-col gap-y-2 rounded-t-2xl bg-background px-4 pt-5 pb-2 md:hidden'>
        <Skeleton className='h-5 w-32' />
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='h-6 w-1/2' />
        <Skeleton className='h-5 w-40' />
      </div>
    </section>
  );
}

export { RecipeOfTheDaySkeleton };
