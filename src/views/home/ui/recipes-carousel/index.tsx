import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/src/shared/ui/carousel';

import { RecipeCard } from './recipe-card';

import type { RecipeBase } from '@/src/entities/recipe';

interface RecipesCarouselProps {
  sectionTitle: string;
  recipes: Array<RecipeBase>;
}

async function RecipesCarousel({ sectionTitle, recipes }: RecipesCarouselProps) {
  return (
    <section className='space-y-2'>
      <h2 className='text-xl font-semibold'>{sectionTitle}</h2>

      <Carousel className='w-full'>
        <CarouselContent>
          {recipes.map(recipe => (
            <CarouselItem key={recipe.id} className='basis-full sm:basis-1/2 lg:basis-1/3 '>
              <RecipeCard recipe={recipe} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots />
      </Carousel>
    </section>
  );
}

export { RecipesCarousel };
