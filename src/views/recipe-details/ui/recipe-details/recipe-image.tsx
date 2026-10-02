import Image from 'next/image';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeImageProps {
  recipe: RecipeDetails;
}

function RecipeImage({ recipe }: RecipeImageProps) {
  return (
    <div className='md:max-lg:container md:max-lg:pt-16 lg:order-last'>
      <div className='relative w-full aspect-square max-h-[50vh] overflow-hidden md:aspect-video md:rounded-lg lg:aspect-[4/3] lg:max-h-none lg:rounded-2xl'>
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          sizes='(min-width: 1024px) 540px, (max-width: 768px) 100vw, 1200px'
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
}

export { RecipeImage };
