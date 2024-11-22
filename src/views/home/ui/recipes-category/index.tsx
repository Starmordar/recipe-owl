import { getWeekPopularRecipes } from '@/src/entities/recipe/api/get-week-popular-recipe';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/src/shared/ui/carousel';

import { RecipeCard } from './recipe-card';

async function RecipesCategory() {
  const latestRecipes = await getWeekPopularRecipes();
  console.log(
    'latestRecipes :>> ',
    latestRecipes.map(r => r.title),
  );
  if (latestRecipes.length === 0) return null;

  return (
    <section className='page-container gap-y-2 pt-0'>
      <h2 className='text-xl font-semibold'>Popular Recipes This Week</h2>

      <Carousel className='w-full'>
        <CarouselContent>
          {latestRecipes.map(recipe => (
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

export { RecipesCategory };
