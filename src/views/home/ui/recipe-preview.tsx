import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/ui/carousel';
import { Skeleton } from '@/src/shared/ui/skeleton';

import { RecipeCard } from './recipe-card';

import type { RecipePreview } from '@/src/entities/recipe';

interface RecipePreviewSectionProps {
  sectionTitle: string;
  recipes: Array<RecipePreview>;
}

function RecipePreviewSection({ sectionTitle, recipes }: RecipePreviewSectionProps) {
  if (recipes.length === 0) return null;

  return (
    <section className='space-y-2 md:space-y-4'>
      <h2 className='text-xl md:text-2xl font-semibold'>{sectionTitle}</h2>
      <Carousel className='w-full'>
        <CarouselContent>
          {recipes.map(recipe => (
            <CarouselItem key={recipe.id} className='basis-60'>
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                className='min-h-48 max-h-72 h-[25vh]'
                imageSizes='290px'
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className='hidden lg:flex' />
        <CarouselNext className='hidden lg:flex' />
      </Carousel>
    </section>
  );
}

function RecipePreviewSectionSkeleton() {
  return (
    <section className='flex flex-col gap-y-4'>
      <Skeleton className='h-8 w-1/2' />

      <div className='flex flex-nowrap gap-x-3 pb-2 overflow-x-auto hide-scrollbar'>
        {new Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} className='min-h-48 max-h-72 h-[25vh] min-w-60' />
        ))}
      </div>
    </section>
  );
}

export { RecipePreviewSection, RecipePreviewSectionSkeleton };
