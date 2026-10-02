import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { RecipeWithUser } from '@/src/entities/recipe';

interface RecipeAuthorProps {
  author: RecipeWithUser['user'];
  avatarSize?: number;
}

function RecipeAuthor({ author, avatarSize = 24 }: RecipeAuthorProps) {
  const t = useTranslations('RecipeDetailsPage.General');

  return (
    <div className='flex items-center gap-x-2'>
      {author.picture ? (
        <Image
          className='shrink-0 rounded-full'
          height={avatarSize}
          width={avatarSize}
          src={author.picture}
          alt=''
        />
      ) : (
        <div
          className='shrink-0 rounded-full bg-primary'
          style={{ height: avatarSize, width: avatarSize }}
        ></div>
      )}

      <p>
        {t.rich('author', {
          author: () => <span className='font-medium'>{author.fullName}</span>,
        })}
      </p>
    </div>
  );
}

export { RecipeAuthor };
