import Image from 'next/image';
import Link from 'next/link';

import { RecipeTagsSection, type RecipeBase } from '@/src/entities/recipe';

interface LatestRecipeCardProps {
  recipe: RecipeBase;
}

function LatestRecipeCard({ recipe }: LatestRecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className='min-w-56'>
      <div className='relative h-[25vh]'>
        <RecipeTagsSection recipe={recipe} />
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes='(max-width: 768px) 50vw, 33vw'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className='text-base font-medium leading-5 my-2 line-clamp-2'>{recipe.title}</p>
    </Link>
  );
}

export { LatestRecipeCard };
