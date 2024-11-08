import Image from 'next/image';

import { cn } from '@/src/shared/lib/classnames';

import type { RecipeWithUser } from '@/src/entities/recipe';

interface RecipeAuthorProps {
  author: RecipeWithUser['user'];
  avatarSize?: number;
}

function RecipeAuthor({ author, avatarSize = 24 }: RecipeAuthorProps) {
  const cssSize = `${avatarSize}px`;

  return (
    <div className='flex items-center gap-x-2'>
      {author.picture ? (
        <Image
          className='rounded-full'
          height={avatarSize}
          width={avatarSize}
          src={author.picture}
          alt='Profile Picture'
        />
      ) : (
        <div className={cn(`h-[${cssSize}] w-[${cssSize}]`, 'rounded-full bg-primary')}></div>
      )}

      <p className='text-md'>
        by <span className='underline'>{author.fullName}</span>
      </p>
    </div>
  );
}

export { RecipeAuthor };
