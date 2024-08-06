import { Skeleton } from '@/components/ui/skeleton';

export default function RecipePreviewCardsSkeleton() {
  const cards = new Array(20).fill(0);

  return (
    <div className="px-2 py-4 grid grid-cols-2 gap-4">
      {cards.map(() => (
        <div className="flex flex-col basis-1/2 gap-2">
          <Skeleton className="h-[140px] rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
