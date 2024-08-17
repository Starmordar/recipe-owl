import Image from 'next/image';

import type { Recipe } from '@/types/recipe';

interface RecipeImageProps {
  recipe: Recipe;
}

function RecipeImage({ recipe }: RecipeImageProps) {
  return (
    <div className='relative h-[40vh]'>
      <Image
        className='rounded-lg'
        src={recipe.imageUrl}
        alt={recipe.title}
        fill
        sizes='(max-width: 768px) 100vw, 33vw'
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

export default RecipeImage;
