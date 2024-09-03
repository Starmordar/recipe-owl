import { Skeleton } from '@/components/ui/skeleton';

function GroceryCartSekeleton() {
  const cards = new Array<number>(20).fill(0);

  return <div className='container grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'></div>;
}

export default GroceryCartSekeleton;
