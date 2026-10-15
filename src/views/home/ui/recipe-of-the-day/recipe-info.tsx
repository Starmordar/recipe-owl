'use client';

import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';

import { parseCookTime, RecipeAuthor } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
import { Button } from '@/src/shared/ui/button';

import type { RecipeWithUser } from '@/src/entities/recipe';

interface RecipeInfoProps {
  recipe: RecipeWithUser;
}

const RecipeInfo = forwardRef<HTMLDivElement, RecipeInfoProps>(({ recipe }, ref) => {
  const t = useTranslations('HomePage.RecipeOfTheDay');

  return (
    <>
      <article className='hidden md:flex flex-col gap-y-3 lg:gap-y-4'>
        <span className='text-sm font-semibold text-primary'>{t('title')}</span>
        <h1 className='text-4xl lg:text-5xl font-bold break-words'>{recipe.title}</h1>

        <RecipeMeta cookTime={recipe.cookTime} tags={recipe.tags} />
        <p className='hidden lg:line-clamp-3 leading-normal break-words text-muted-foreground'>
          {recipe.description}
        </p>

        <div className='text-sm text-muted-foreground'>
          <RecipeAuthor author={recipe.user} avatarSize={20} />
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
      </article>

      <Link
        href={publicUrls.recipe(recipe.id)}
        aria-label={t('readMoreLinkAreaLabel')}
        className='relative block -mt-5 rounded-t-2xl bg-background md:hidden'
      >
        <article ref={ref} className='flex flex-col gap-y-2 px-4 pt-5 pb-2'>
          <span className='text-sm font-semibold text-primary'>{t('title')}</span>
          <h1 className='text-2xl font-bold leading-tight break-words text-balance'>
            {recipe.title}
          </h1>

          <RecipeMeta cookTime={recipe.cookTime} tags={recipe.tags} />

          <div className='text-sm text-muted-foreground'>
            <RecipeAuthor author={recipe.user} avatarSize={20} />
          </div>
        </article>
      </Link>
    </>
  );
});

RecipeInfo.displayName = 'RecipeInfo';

interface RecipeMetaProps {
  cookTime: string | null;
  tags: Array<string>;
}

function RecipeMeta({ cookTime, tags }: RecipeMetaProps) {
  const t = useTranslations();
  if (!cookTime && tags.length === 0) return null;

  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-2 text-sm'>
      {cookTime && (
        <p className='flex items-center gap-x-1.5 text-muted-foreground'>
          <Clock className='h-4 w-4' aria-hidden='true' />
          {t('RecipeDetailsPage.General.cookTime', { ...parseCookTime(cookTime) })}
        </p>
      )}

      {tags.length > 0 && (
        <ul className='flex flex-wrap gap-1.5'>
          {tags.map(tag => (
            <li key={tag} className='py-0.5 px-2.5 rounded-full bg-[#EAF3DE] text-[#27500A]'>
              {t(`RecipeTags.Items.${tag}`)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { RecipeInfo };
