import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipeDetailsPageSkeleton() {
  const ingredients = new Array<number>(10).fill(0);

  return (
    <>
      <div className='h-11 w-full'></div>

      <main className='page-container mt-2'>
        <Skeleton className='h-8 w-[250px]' />
        <Skeleton className='h-28' />

        <Skeleton className='h-6 w-[100px]' />

        <Skeleton className='h-[40vh] rounded-lg' />

        <Skeleton className='h-9 mb-2 w-[200px]' />
        <div className='flex flex-col gap-y-4'>
          {ingredients.map((_, index) => (
            <div key={index} className='flex justify-between'>
              <Skeleton className='h-4 w-[65vw]' />
              <Skeleton className='h-4 w-[20vw]' />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export { RecipeDetailsPageSkeleton };
