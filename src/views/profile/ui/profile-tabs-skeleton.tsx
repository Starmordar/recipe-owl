import { RecipeCardSkeleton } from '@/src/entities/recipe';

function ProfileTabsSkeleton() {
  const cards = new Array<number>(6).fill(0);

  return (
    <main className='page-container pt-2'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
        {cards.map((_, index) => (
          <RecipeCardSkeleton key={index} className='aspect-[4/3]' />
        ))}
      </div>
    </main>
  );
}

export { ProfileTabsSkeleton };
