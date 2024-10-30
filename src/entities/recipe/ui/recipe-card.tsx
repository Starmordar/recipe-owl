import Image from 'next/image';
import Link from 'next/link';

import { publicUrls } from '@/src/shared/config/url';

import type { RecipeSearchResult } from '../model/types';

interface RecipeCardProps {
  recipe: RecipeSearchResult;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={publicUrls.recipe(recipe.id)}>
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
