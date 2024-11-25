import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/src/shared/ui/carousel';

import { RecipeCard } from './recipe-card';

import type { RecipeBase } from '@/src/entities/recipe';

interface RecipesCarouselProps {
  sectionTitle: string;
  recipes: Array<RecipeBase>;
}

async function RecipesCarousel({ sectionTitle, recipes }: RecipesCarouselProps) {
  return (
    <section className='page-container gap-y-2 pt-0'>
      <h2 className='text-xl font-semibold'>{sectionTitle}</h2>

      <Carousel className='w-full'>
        <CarouselContent>
          {recipes.map(recipe => (
            <CarouselItem key={recipe.id}>
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
