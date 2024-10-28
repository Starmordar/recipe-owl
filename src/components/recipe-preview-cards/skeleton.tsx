import { Skeleton } from '@/src/shared/ui/skeleton';

function RecipePreviewCardsSkeleton() {
  const cards = new Array<number>(20).fill(0);

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {cards.map((_, index) => (
        <div key={index} className='flex flex-col gap-2'>
          <Skeleton className='h-[20vh] rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-5' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipePreviewCardsSkeleton;
