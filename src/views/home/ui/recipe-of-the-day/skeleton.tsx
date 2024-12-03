import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipeOfTheDaySkeleton() {
  return (
    <>
      <section className='relative w-full h-[55vh]'>
        <Skeleton className='w-full h-[55vh]' />
      </section>

      <div className='flex justify-center'>
        <Skeleton className='relative h-32 transform -translate-y-10 -mb-6 flex flex-col p-4 min-w-96 mx-6 rounded-lg bg-orange-100 z-100' />
      </div>
    </>
  );
}

export { RecipeOfTheDaySkeleton };
