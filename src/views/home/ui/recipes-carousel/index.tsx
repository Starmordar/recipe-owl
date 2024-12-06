import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/ui/carousel';

import { RecipeCard } from '../recipe-card';

import type { RecipeBase } from '@/src/entities/recipe';

interface RecipesCarouselProps {
  sectionTitle: string;
  recipes: Array<RecipeBase>;
}

async function RecipesCarousel({ sectionTitle, recipes }: RecipesCarouselProps) {
  return (
    <section className='space-y-2 md:space-y-4'>
      <h2 className='text-xl md:text-2xl font-semibold'>{sectionTitle}</h2>

      <Carousel
        className='w-full'
        opts={{ breakpoints: { '(max-width: 1024px)': { dragFree: false } } }}
      >
        <CarouselContent>
          {recipes.map(recipe => (
            <CarouselItem
              key={recipe.id}
              className='basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4'
            >
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                className='h-[30vh] min-h-56'
                imageSizes='(max-width: 768px) 50vw, 33vw'
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots className='lg:hidden' />
        <CarouselPrevious className='hidden lg:flex' />
        <CarouselNext className='hidden lg:flex' />
      </Carousel>
    </section>
  );
}

export { RecipesCarousel };
