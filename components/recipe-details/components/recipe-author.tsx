import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { RecipeDetails } from '@/types/api';

interface RecipeAuthorProps {
  recipe: RecipeDetails;
  avatarSize?: number;
}

function RecipeAuthor({ recipe, avatarSize = 24 }: RecipeAuthorProps) {
  const cssSize = `${avatarSize}px`;

  return (
    <div className='flex items-center gap-x-2'>
      {recipe.user.picture ? (
        <Image
          className='rounded-full'
          height={avatarSize}
          width={avatarSize}
          src={recipe.user.picture}
          alt='Profile Picture'
        />
      ) : (
        <div className={cn(`h-[${cssSize}] w-[${cssSize}]`, 'rounded-full bg-purple-600')}></div>
      )}

      <p className='text-md'>{recipe.user.fullName}</p>
    </div>
  );
}

export default RecipeAuthor;
