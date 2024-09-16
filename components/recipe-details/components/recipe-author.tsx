import Image from 'next/image';

import type { RecipeDetails } from '@/types/api';

interface RecipeAuthorProps {
  recipe: RecipeDetails;
}

function RecipeAuthor({ recipe }: RecipeAuthorProps) {
  return (
    <div className='flex items-center justify-center gap-x-2 mt-2'>
      {recipe.user.picture ? (
        <Image
          className='rounded-full'
          height={20}
          width={20}
          src={recipe.user.picture}
          alt='Profile Picture'
        />
      ) : (
        <div className='h-5 w-5 rounded-full bg-purple-600'></div>
      )}

      <p className='text-sm'>{recipe.user.fullName}</p>
    </div>
  );
}

export default RecipeAuthor;
