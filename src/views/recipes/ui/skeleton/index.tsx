import { RecipeCardSkeleton } from '@/src/entities/recipe';
import { cn } from '@/src/shared/lib/classnames';
import { Skeleton } from '@/src/shared/ui/skeleton';

const chipWidths = ['w-24', 'w-16', 'w-20', 'w-20', 'w-24', 'w-14'];

function RecipesPageSkeleton() {
  const cards = new Array<number>(8).fill(0);

  return (
    <>
      <div className='container lg:max-w-6xl lg:px-8 flex flex-col gap-y-3 py-2'>
        <Skeleton className='h-10 rounded-3xl' />
        <div className='flex gap-x-2 overflow-hidden'>
          {chipWidths.map((width, index) => (
            <Skeleton key={index} className={cn(width, 'h-8 shrink-0 rounded-full')} />
          ))}
        </div>
      </div>

      <main className='page-container lg:max-w-6xl lg:px-8 pt-2 md:pt-4'>
        <Skeleton className='h-7 md:h-8 w-48' />

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-5'>
          {cards.map((_, index) => (
            <RecipeCardSkeleton key={index} className='aspect-[4/3]' />
          ))}
        </div>
      </main>
    </>
  );
}

export { RecipesPageSkeleton };
