import { Skeleton } from '@/src/shared/ui/skeleton';

function getRandomArbitrary(min = 75, max = 150) {
  return Math.random() * (max - min) + min;
}

function RecipeTagsFiltersSkeleton() {
  const tags = new Array<number>(3).fill(0);
  const categories = new Array<number>(7).fill(0);

  return (
    <>
      {tags.map((_, index) => (
        <div key={index} className='flex flex-col flex-wrap items-start gap-4 py-4'>
          <Skeleton className='h-7 w-24' />

          <div className='flex flex-wrap justify-start gap-2'>
            {categories.map((width, index) => (
              <Skeleton key={index} className='h-9' style={{ width: getRandomArbitrary() }} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export { RecipeTagsFiltersSkeleton };
