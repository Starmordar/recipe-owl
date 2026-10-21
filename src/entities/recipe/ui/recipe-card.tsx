import { Clock } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
import { cn } from '@/src/shared/lib/classnames';
import { Skeleton } from '@/src/shared/ui/skeleton';

import { parseCookTime } from '../lib/parseCookTime';

import type { RecipePreview } from '../model/types';

interface RecipeCardProps {
  recipe: RecipePreview;
  className: string;
  imageSizes: string;
}

function RecipeCard({ recipe, imageSizes, className }: RecipeCardProps) {
  return (
    <Link href={publicUrls.recipe(recipe.id)} className='group space-y-2'>
      <div className={cn(className, 'relative rounded-lg overflow-hidden')}>
        <Image
          className='transition-transform group-hover:scale-110 duration-300'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes={imageSizes}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className='space-y-0.5'>
        <p className='text-base font-medium leading-5 line-clamp-2'>{recipe.title}</p>
        <RecipeCardMeta cookTime={recipe.cookTime} tag={recipe.tags[0]} />
      </div>
    </Link>
  );
}

interface RecipeCardMetaProps {
  cookTime: string | null;
  tag?: string;
}

function RecipeCardMeta({ cookTime, tag }: RecipeCardMetaProps) {
  const t = useTranslations();
  if (!cookTime && !tag) return null;

  const details = [
    cookTime && t('RecipeDetailsPage.General.cookTime', { ...parseCookTime(cookTime) }),
    tag && t(`RecipeTags.Items.${tag}`),
  ];

  return (
    <p className='flex items-center gap-x-1 text-sm text-muted-foreground'>
      {cookTime && <Clock className='h-3.5 w-3.5 shrink-0' aria-hidden='true' />}
      <span className='truncate'>{details.filter(Boolean).join(' · ')}</span>
    </p>
  );
}

interface RecipeCardSkeletonProps {
  className: string;
}

function RecipeCardSkeleton({ className }: RecipeCardSkeletonProps) {
  return (
    <div className='flex flex-col gap-y-2'>
      <Skeleton className={cn(className, 'rounded-lg')} />
      <Skeleton className='h-5 w-3/4' />
      <Skeleton className='h-4 w-1/2' />
    </div>
  );
}

export { RecipeCard, RecipeCardMeta, RecipeCardSkeleton };
