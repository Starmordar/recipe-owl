import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/shared/ui/carousel';

import { getMostPopularRecipes } from '../../actions';

import RecipeCard from './components/recipe-card';

async function RecipesCategory() {
  const latestRecipes = await getMostPopularRecipes();
  if (latestRecipes.length === 0) return null;

  return (
    <section className='page-container gap-y-2'>
      <h2 className='text-xl font-semibold'>Our Most Popular Recipes</h2>

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

export default RecipesCategory;
