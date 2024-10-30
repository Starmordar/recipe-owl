'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

import { RecipeAuthor, type RecipeWithUser } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';

interface RecipeInfoProps {
  recipe: RecipeWithUser;
}

const RecipeInfo = forwardRef<HTMLDivElement, RecipeInfoProps>(({ recipe }, ref) => {
  return (
    <Link href={publicUrls.recipe(recipe.id)} aria-label='Read more about Recipe of the Day'>
      <article
        ref={ref}
        className='transform -translate-y-10 -mb-6 mx-auto flex flex-col p-4 w-[80vw] rounded-lg bg-secondary z-100'
      >
        <span className='text-base'>Recipe of the Day</span>
        <h1 className='text-2xl font-semibold mb-3'>{recipe.title}</h1>

        <RecipeAuthor author={recipe.user} avatarSize={20} />
      </article>
    </Link>
  );
});

RecipeInfo.displayName = 'RecipeInfo';
export { RecipeInfo };
