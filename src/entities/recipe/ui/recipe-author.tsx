import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/src/shared/lib/classnames';

import type { RecipeWithUser } from '@/src/entities/recipe';

interface RecipeAuthorProps {
  author: RecipeWithUser['user'];
  avatarSize?: number;
}

function RecipeAuthor({ author, avatarSize = 24 }: RecipeAuthorProps) {
  const t = useTranslations('RecipeDetails.Description');
  const cssSize = `${avatarSize}px`;

  return (
    <div className='flex items-center gap-x-2'>
      {author.picture ? (
        <Image
          className='rounded-full'
          height={avatarSize}
          width={avatarSize}
          src={author.picture}
          alt=''
        />
      ) : (
        <div className={cn(`h-[${cssSize}] w-[${cssSize}]`, 'rounded-full bg-primary')}></div>
      )}

      <p className='text-md'>
        {t.rich('author', { author: () => <span className='underline'>{author.fullName}</span> })}
      </p>
    </div>
  );
}

export { RecipeAuthor };
