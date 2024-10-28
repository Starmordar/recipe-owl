import Image from 'next/image';

import type { RecipeDetails } from '@/entities/recipe';

interface RecipeImageProps {
  recipe: RecipeDetails;
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
        priority
      />
    </div>
  );
}

export default RecipeImage;
