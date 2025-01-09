'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';

import { RecipeAuthor, RecipeCookTime, RecipeTagsSummary } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { hashColor } from '@/src/shared/lib/color';
import { Button } from '@/src/shared/ui/button';

import type { RecipeWithUser } from '@/src/entities/recipe';

interface RecipeInfoProps {
  recipe: RecipeWithUser;
}

const RecipeInfo = forwardRef<HTMLDivElement, RecipeInfoProps>(({ recipe }, ref) => {
  const t = useTranslations('HomePage.RecipeOfTheDay');

  return (
    <>
      <article className='hidden md:flex flex-col relative col-span-2 pr-4 lg:pr-8 py-6'>
        <span className='text-lg mb-2'>{t('title')}</span>

        <div className='flex flex-col gap-y-4'>
          <h1 className='md:text-4xl lg:text-5xl font-semibold md:font-bold'>{recipe.title}</h1>
          <p className='text-lg break-words line-clamp-5'>{recipe.description}</p>

          <div className='flex flex-col gap-y-2 py-3'>
            <RecipeCookTime cookTime={recipe.cookTime} />
            {recipe.tags.length > 0 && <RecipeTags tags={recipe.tags} />}
          </div>

          <Link
            href={publicUrls.recipe(recipe.id)}
            className='self-start'
            aria-label={t('readMoreLinkAreaLabel')}
          >
            <Button size='lg' className='text-base'>
              {t('readMoreLinkLabel')}
            </Button>
          </Link>
          <RecipeAuthor author={recipe.user} avatarSize={28} />
        </div>
      </article>

      <Link
        href={publicUrls.recipe(recipe.id)}
        aria-label={t('readMoreLinkAreaLabel')}
        className='flex justify-center md:hidden'
      >
        <article
          ref={ref}
          className='relative transform -translate-y-10 -mb-6 md:transform-none lex flex-col p-4 min-w-96 mx-6 rounded-lg bg-orange-100 dark:bg-orange-400 z-100'
        >
          <div className='absolute top-4 right-4 z-10 text-sm flex gap-2'>
            <RecipeTagsSummary tags={recipe.tags} />
          </div>

          <span className='text-base'>{t('title')}</span>

          <div className='flex flex-col gap-y-4 mt-2'>
            <h1 className='text-3xl font-semibold'>{recipe.title}</h1>
            <RecipeAuthor author={recipe.user} avatarSize={28} />
          </div>
        </article>
      </Link>
    </>
  );
});

RecipeInfo.displayName = 'RecipeInfo';

interface RecipeTagsProps {
  tags: Array<string>;
}

function RecipeTags({ tags }: RecipeTagsProps) {
  const t = useTranslations('RecipeDetailsPage.General');

  return (
    <div className='flex flex-wrap gap-x-1.5 gap-y-2 items-center'>
      {t('tagsLabel')}
      {tags.map(tag => (
        <div
          key={tag}
          style={{ borderColor: hashColor(tag) }}
          className='py-0.5 px-2.5 border rounded-lg'
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

export { RecipeInfo };
