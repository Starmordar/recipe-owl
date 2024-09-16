import Image from 'next/image';

import type { RecipeDetails } from '@/types/api';

interface RecipeAuthorProps {
  recipe: RecipeDetails;
}

function RecipeAuthor({ recipe }: RecipeAuthorProps) {
  return (
    <div className='flex items-center gap-x-2'>
      {recipe.user.picture ? (
        <Image
          className='rounded-full'
          height={24}
          width={24}
          src={recipe.user.picture}
          alt='Profile Picture'
        />
      ) : (
        <div className='h-6 w-6 rounded-full bg-purple-600'></div>
      )}

      <p className='text-md'>{recipe.user.fullName}</p>
    </div>
  );
}

export default RecipeAuthor;
