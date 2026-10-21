import { RecipeCardSkeleton } from '@/src/entities/recipe';

function ProfileTabsSkeleton() {
  const cards = new Array<number>(8).fill(0);

  return (
    <div className='grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-5 pt-4'>
      {cards.map((_, index) => (
        <RecipeCardSkeleton key={index} className='aspect-[4/3]' />
      ))}
    </div>
  );
}

export { ProfileTabsSkeleton };
