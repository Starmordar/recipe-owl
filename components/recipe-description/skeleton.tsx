import { Skeleton } from '../ui/skeleton';

export default async function RecipeSkeleton() {
  const ingredients = new Array(10).fill(null);

  return (
    <div className="container flex flex-col gap-4">
      <section>
        <Skeleton className="h-7 w-[200px] mb-1" />
        <Skeleton className="h-20 mb-1" />
      </section>
      <section>
        <Skeleton className="h-[40vh] rounded-lg" />
      </section>

      <section>
        <Skeleton className="h-7 mb-2 w-[200px]" />

        <div className="flex flex-col gap-2">
          {ingredients.map(() => (
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[65vw]" />
              <Skeleton className="h-4 w-[20vw]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
