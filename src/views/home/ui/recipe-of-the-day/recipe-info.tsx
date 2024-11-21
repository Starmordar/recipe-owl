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
    <Link
      href={publicUrls.recipe(recipe.id)}
      aria-label='Read more about Recipe of the Day'
      className='flex justify-center'
    >
      <article
        ref={ref}
        className='relative transform -translate-y-10 -mb-6 flex flex-col p-4 max-w-md mx-4 rounded-lg bg-orange-100 z-100'
      >
        <div className='absolute top-4 right-4 z-10 text-sm flex gap-2'>
          {recipe.tags.length > 0 && (
            <div className='bg-lime-200 rounded-xl px-2 py-0.5'>{recipe.tags[0]}</div>
          )}
        </div>

        <span className='text-base mb-2'>Recipe of the Day</span>
        <h1 className='text-3xl font-semibold mb-4'>{recipe.title}</h1>

        <RecipeAuthor author={recipe.user} avatarSize={28} />
      </article>
    </Link>
  );
});

RecipeInfo.displayName = 'RecipeInfo';
export { RecipeInfo };
