import Image from 'next/image';

import type { RecipeDetails } from '@/src/entities/recipe';

import { cn } from '@/src/shared/lib/classnames';

interface RecipeAuthorProps {
  recipe: { user: RecipeDetails['user'] };
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
