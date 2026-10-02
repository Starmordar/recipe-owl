import { BookOpen, Clock, ExternalLink, Play, ShoppingBasket } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { parseCookTime, RecipeAuthor, type RecipeDetails } from '@/src/entities/recipe';
import { isValidURL } from '@/src/shared/lib/is-valid-url';
import { ReadMoreText } from '@/src/shared/ui/read-more-text';

import { ScrollMarker } from '../scroll-marker-provider';

const videoHosts = ['youtube.com', 'youtu.be', 'vimeo.com', 'tiktok.com', 'rutube.ru'];

interface RecipeDescriptionProps {
  recipe: RecipeDetails;
}

function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  const description = recipe.description?.trim();

  return (
    <section className='flex flex-col gap-y-3 lg:gap-y-4'>
      <h1 className='relative text-2xl font-bold leading-tight break-words text-balance lg:text-4xl lg:leading-tight'>
        {recipe.title}
        <ScrollMarker name='title' className='bottom-0 left-0' />
      </h1>

      <RecipeMeta recipe={recipe} />
      {recipe.tags.length > 0 && <RecipeTags tags={recipe.tags} />}

      {description && (
        <ReadMoreText
          className='leading-normal break-words text-muted-foreground'
          clampClassName='line-clamp-3'
        >
          {description}
        </ReadMoreText>
      )}

      <div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm text-muted-foreground lg:justify-start lg:gap-x-4'>
        <RecipeAuthor author={recipe.user} avatarSize={20} />
        <RecipeSource source={recipe.source} />
      </div>
    </section>
  );
}

interface RecipeMetaProps {
  recipe: RecipeDetails;
}

function RecipeMeta({ recipe }: RecipeMetaProps) {
  const t = useTranslations('RecipeDetailsPage.General');

  return (
    <div className='flex items-center gap-x-4 text-sm text-muted-foreground'>
      {recipe.cookTime && (
        <p className='flex items-center gap-x-1.5'>
          <Clock className='h-4 w-4' aria-hidden='true' />
          <span className='sr-only'>{t('timeLabel')}</span>
          {t('cookTime', { ...parseCookTime(recipe.cookTime) })}
        </p>
      )}

      <p className='flex items-center gap-x-1.5'>
        <ShoppingBasket className='h-4 w-4' aria-hidden='true' />
        {t('ingredientsCount', { count: recipe.ingredients.length })}
      </p>
    </div>
  );
}

interface RecipeTagsProps {
  tags: Array<string>;
}

function RecipeTags({ tags }: RecipeTagsProps) {
  const t = useTranslations('RecipeTags');

  return (
    <ul className='flex flex-wrap gap-1.5'>
      {tags.map(tag => (
        <li key={tag} className='py-1 px-3 rounded-full text-sm bg-[#EAF3DE] text-[#27500A]'>
          {t(`Items.${tag}`)}
        </li>
      ))}
    </ul>
  );
}

interface RecipeSourceProps {
  source: string | null;
}

function RecipeSource({ source }: RecipeSourceProps) {
  const t = useTranslations('RecipeDetailsPage.General');

  const text = source?.trim();
  if (!text) return null;

  const link = getSourceLink(text);

  if (link?.isVideo) {
    return (
      <a
        className='inline-flex shrink-0 items-center gap-x-1.5 py-1.5 px-3 rounded-full border border-input font-medium text-foreground'
        href={link.href}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Play className='h-3.5 w-3.5' aria-hidden='true' />
        {t('watchVideo')}
      </a>
    );
  }

  return (
    <p className='flex min-w-0 max-w-full items-center gap-x-1.5'>
      <span className='sr-only'>{t('sourceLabel')}</span>

      {link ? (
        <>
          <ExternalLink className='h-4 w-4 shrink-0' aria-hidden='true' />
          <a
            className='truncate underline underline-offset-2'
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
          >
            {link.hostname}
          </a>
        </>
      ) : (
        <>
          <BookOpen className='h-4 w-4 shrink-0' aria-hidden='true' />
          <span className='truncate'>{text}</span>
        </>
      )}
    </p>
  );
}

function getSourceLink(source: string) {
  if (!isValidURL(source)) return null;

  try {
    const url = new URL(/^https?:\/\//i.test(source) ? source : `https://${source}`);
    const hostname = url.hostname.replace(/^www\./, '');
    const isVideo = videoHosts.some(host => hostname === host || hostname.endsWith(`.${host}`));

    return { href: url.href, hostname, isVideo };
  } catch {
    return null;
  }
}

export { RecipeDescription };
