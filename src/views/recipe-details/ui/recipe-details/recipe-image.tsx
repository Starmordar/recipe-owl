import Image from 'next/image';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeImageProps {
  recipe: RecipeDetails;
}

function RecipeImage({ recipe }: RecipeImageProps) {
  return (
    <div className='md:container md:pt-16'>
      <div className='relative w-full aspect-square max-h-[50vh] overflow-hidden md:aspect-video md:rounded-lg'>
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          sizes='(max-width: 768px) 100vw, 1200px'
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
}

export { RecipeImage };
