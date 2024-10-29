import Image from 'next/image';
import Link from 'next/link';

import RecipeAuthor from '@/src/views/recipe-details/ui/recipe-details/recipe-author';

import type { RecipeWithUser } from '@/src/entities/recipe';

interface Props {
  recipe: RecipeWithUser;
}

async function RecipeCard({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.id}`} className='min-w-64'>
      <div className='relative h-[40vh]'>
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={recipe.title ?? ''}
          fill
          sizes='(max-width: 768px) 50vw, 33vw'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <p className='text-base font-medium leading-5 my-2'>{recipe.title}</p>
      <RecipeAuthor recipe={recipe} avatarSize={20} />
    </Link>
  );
}

export default RecipeCard;
