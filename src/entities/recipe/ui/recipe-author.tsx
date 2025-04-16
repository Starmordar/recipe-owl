import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/src/shared/lib/classnames';

interface RecipeAuthorProps {
  /** The author's information containing their profile picture and full name */
  author: { picture: string | null; fullName: string };
  /** Size of the avatar in pixels */
  avatarSize?: number;
}

function RecipeAuthor({ author, avatarSize = 24 }: RecipeAuthorProps) {
  const t = useTranslations('RecipeDetailsPage.General');
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
        <div
          className={cn('rounded-full bg-primary')}
          style={{ width: cssSize, height: cssSize }}
        ></div>
      )}

      <p className='text-md'>
        {t.rich('author', { author: () => <span className='underline'>{author.fullName}</span> })}
      </p>
    </div>
  );
}

export { RecipeAuthor };
