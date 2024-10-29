import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipeDetailsFormSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      {/* Main Section */}
      <Skeleton className='h-[25vh] w-full' />

      <Skeleton className='h-10 w-full' />
      <Skeleton className='h-20 w-full' />

      {/* Ingredients Section */}
      <Skeleton className='h-7 w-[200px]' />
      <div className='flex w-full gap-x-4 pr-10'>
        <Skeleton className='h-10 basis-1/3' />
        <Skeleton className='h-10 basis-2/3' />
      </div>
      <div className='flex w-full gap-x-4 pr-10'>
        <Skeleton className='h-10 basis-1/3' />
        <Skeleton className='h-10 basis-2/3' />
      </div>

      {/* Method Section */}
      <Skeleton className='h-7 w-[200px]' />

      <div className='flex w-full gap-x-4 pr-10'>
        <Skeleton className='h-20 w-full' />
      </div>
    </div>
  );
}

export { RecipeDetailsFormSkeleton };
