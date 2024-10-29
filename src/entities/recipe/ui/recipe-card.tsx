import Image from 'next/image';
import Link from 'next/link';

import type { RecipeSearchResult } from '../model/type';

interface RecipeCardProps {
  recipe: RecipeSearchResult;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className='relative h-[20vh]'>
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes='(max-width: 768px) 50vw, 33vw'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className='text-base font-medium leading-5 mt-1'>{recipe.title}</p>
    </Link>
  );
}

export { RecipeCard };
