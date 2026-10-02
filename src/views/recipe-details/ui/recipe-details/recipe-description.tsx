import { BookOpen, Clock, ExternalLink, ShoppingBasket } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { parseCookTime, RecipeAuthor, type RecipeDetails } from '@/src/entities/recipe';
import { isValidURL } from '@/src/shared/lib/is-valid-url';
import { ReadMoreText } from '@/src/shared/ui/read-more-text';

interface RecipeDescriptionProps {
  recipe: RecipeDetails;
}

function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  const description = recipe.description?.trim();

  return (
    <section className='flex flex-col gap-y-3'>
      <h1 className='text-2xl font-bold leading-tight break-words text-balance'>{recipe.title}</h1>

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

      <RecipeSource source={recipe.source} />
    </section>
  );
}

interface RecipeMetaProps {
  recipe: RecipeDetails;
}

function RecipeMeta({ recipe }: RecipeMetaProps) {
  const t = useTranslations('RecipeDetailsPage.General');

  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground'>
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

      <RecipeAuthor author={recipe.user} avatarSize={20} />
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

  return (
    <p className='flex items-center gap-x-1.5 text-sm text-muted-foreground'>
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
    return { href: url.href, hostname: url.hostname.replace(/^www\./, '') };
  } catch {
    return null;
  }
}

export { RecipeDescription };
