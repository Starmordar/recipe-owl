import Image from 'next/image';

import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/ui/carousel';

import { RecipeCardMeta } from '../recipe-card';

import type { RecipeBase } from '@/src/entities/recipe';

const rowsPerColumn = 3;

interface RecipesCarouselProps {
  sectionTitle: string;
  recipes: Array<RecipeBase>;
}

// A ranked list, three recipes per column, swiped column by column.
async function RecipesCarousel({ sectionTitle, recipes }: RecipesCarouselProps) {
  const columns = Array.from({ length: Math.ceil(recipes.length / rowsPerColumn) }, (_, index) =>
    recipes.slice(index * rowsPerColumn, (index + 1) * rowsPerColumn),
  );

  return (
    <section>
      <Carousel
        className='w-full space-y-2 md:space-y-4'
        opts={{ breakpoints: { '(max-width: 1024px)': { dragFree: false } } }}
      >
        <div className='flex items-center justify-between gap-x-4'>
          <h2 className='text-xl md:text-2xl font-semibold'>{sectionTitle}</h2>

          <div className='hidden lg:flex shrink-0 gap-x-2'>
            <CarouselPrevious className='static translate-y-0' />
            <CarouselNext className='static translate-y-0' />
          </div>
        </div>

        <CarouselContent>
          {columns.map((column, columnIndex) => (
            <CarouselItem key={columnIndex} className='basis-[85%] sm:basis-1/2 lg:basis-1/3'>
              <ol className='divide-y'>
                {column.map((recipe, index) => (
                  <li key={recipe.id}>
                    <RankedRecipe recipe={recipe} rank={columnIndex * rowsPerColumn + index + 1} />
                  </li>
                ))}
              </ol>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

interface RankedRecipeProps {
  recipe: RecipeBase;
  rank: number;
}

function RankedRecipe({ recipe, rank }: RankedRecipeProps) {
  return (
    <Link href={publicUrls.recipe(recipe.id)} className='group flex items-center gap-x-3 py-2'>
      <div className='relative h-16 w-16 shrink-0 rounded-lg overflow-hidden'>
        <Image
          className='transition-transform group-hover:scale-110 duration-300'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes='64px'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <span className='shrink-0 min-w-5 text-2xl font-semibold text-muted-foreground'>{rank}</span>

      <div className='min-w-0 space-y-0.5'>
        <p className='text-base font-medium leading-5 line-clamp-2'>{recipe.title}</p>
        <RecipeCardMeta cookTime={recipe.cookTime} />
      </div>
    </Link>
  );
}

export { RecipesCarousel };
