import Image from 'next/image';
import Link from 'next/link';

import { type RecipeBase, RecipeTagsSection } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';

interface RecipeCardProps {
  recipe: RecipeBase;
}

async function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={publicUrls.recipe(recipe.id)} className='w-full space-y-2'>
      <div className='relative h-[30vh] min-h-48'>
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

      <p className='text-base font-medium leading-5 line-clamp-2'>{recipe.title}</p>
    </Link>
  );
}

export { RecipeCard };
