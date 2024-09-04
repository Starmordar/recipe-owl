import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function GroceryCartSekeleton() {
  const cards = new Array<number>(2).fill(0);
  const ingredients = new Array<number>(5).fill(0);

  return (
    <>
      <Skeleton className='relative h-6 w-full' />

      {cards.map(card => (
        <Card key={card}>
          <CardHeader className='flex flex-row p-4 space-y-0 gap-4'>
            <Skeleton className='relative min-w-[20vw] w-[20vw] h-[20vw]' />

            <Skeleton className='relative w-full pr-4' />
          </CardHeader>
          <CardContent className='grid p-4 pt-0 space-y-2 divide-y'>
            {ingredients.map(ingredient => (
              <div key={ingredient} className='py-2 space-y-2'>
                <Skeleton className='relative w-[80vw] h-5' />
                <Skeleton className='relative w-[20vw] h-4' />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default GroceryCartSekeleton;
