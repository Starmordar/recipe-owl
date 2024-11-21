import Image from 'next/image';
import Link from 'next/link';

import { publicUrls } from '@/src/shared/config/url';

import type { RecipeSearchResult } from '../model/types';

interface RecipeCardProps {
  recipe: RecipeSearchResult;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={publicUrls.recipe(recipe.id)} className='relative'>
      <TagsSection recipe={recipe} />
      <div className='relative h-[25vh]'>
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes='(max-width: 768px) 50vw, 33vw'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className='text-base leading-5 mt-2 line-clamp-2'>{recipe.title}</p>
    </Link>
  );
}

interface TagsSectionProps {
  recipe: RecipeSearchResult;
}

function TagsSection({ recipe }: TagsSectionProps) {
  return (
    <div className='absolute top-2 left-2 z-10 text-sm flex gap-2'>
      {recipe.cookTime && (
        <div className='bg-orange-200 rounded-xl px-2 py-0.5'>{recipe.cookTime}</div>
      )}
      {recipe.tags.length > 0 && (
        <div className='bg-lime-200 rounded-xl  px-2 py-0.5'>{recipe.tags[0]}</div>
      )}
    </div>
  );
}

export { RecipeCard, TagsSection };
