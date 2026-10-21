import { useTranslations } from 'next-intl';

import { RecipeCard } from '@/src/entities/recipe';
import { Link } from '@/src/shared/i18n/routing';
import { cn } from '@/src/shared/lib/classnames';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/ui/carousel';
import { Skeleton } from '@/src/shared/ui/skeleton';

import type { RecipePreview } from '@/src/entities/recipe';

interface RecipePreviewSectionProps {
  sectionTitle: string;
  subtitle?: string;
  seeAllUrl?: string;
  recipes: Array<RecipePreview>;
}

function RecipePreviewSection({
  sectionTitle,
  subtitle,
  seeAllUrl,
  recipes,
}: RecipePreviewSectionProps) {
  const t = useTranslations('HomePage');
  if (recipes.length === 0) return null;

  return (
    <section>
      <Carousel className='w-full space-y-2 md:space-y-4'>
        <div className='space-y-0.5'>
          <div className='flex items-baseline justify-between gap-x-4'>
            <h2 className='text-xl md:text-2xl font-semibold'>{sectionTitle}</h2>

            <div className='flex shrink-0 items-center gap-x-4'>
              {seeAllUrl && (
                <Link
                  href={seeAllUrl}
                  className='whitespace-nowrap -my-2 py-2 text-sm font-medium text-primary'
                  aria-label={t('seeAllLinkAreaLabel', { title: sectionTitle })}
                >
                  {t('seeAllLinkLabel')}
                </Link>
              )}

              <div className='hidden lg:flex gap-x-2'>
                <CarouselPrevious className='static translate-y-0' />
                <CarouselNext className='static translate-y-0' />
              </div>
            </div>
          </div>

          {subtitle && <p className='text-sm text-muted-foreground'>{subtitle}</p>}
        </div>

        <CarouselContent>
          {recipes.map(recipe => (
            <CarouselItem key={recipe.id} className='basis-60 md:basis-1/3 lg:basis-1/4'>
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                className='aspect-[8/5]'
                imageSizes='290px'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function RecipePreviewSectionSkeleton() {
  return (
    <section className='flex flex-col gap-y-4'>
      <Skeleton className='h-8 w-1/2' />

      <div className='flex flex-nowrap gap-x-3 pb-2 overflow-x-auto hide-scrollbar md:grid md:grid-cols-3 md:gap-x-4 lg:grid-cols-4'>
        {new Array(5).fill(0).map((_, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col gap-y-2 min-w-60 md:min-w-0',
              index === 3 && 'md:hidden lg:flex',
              index === 4 && 'md:hidden',
            )}
          >
            <Skeleton className='aspect-[8/5]' />
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    </section>
  );
}

export { RecipePreviewSection, RecipePreviewSectionSkeleton };
