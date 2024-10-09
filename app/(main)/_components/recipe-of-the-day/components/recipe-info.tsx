'use client';

import { forwardRef } from 'react';

import RecipeAuthor from '@/components/recipe-details/components/recipe-author';

import type { RecipePreview } from '@/types/api';

interface Props {
  recipe: RecipePreview;
}

const RecipeInfo = forwardRef<HTMLDivElement, Props>(({ recipe }, ref) => {
  return (
    <article
      ref={ref}
      className='transform -translate-y-10 -mb-6 mx-auto flex flex-col p-4 w-[80vw] rounded-lg bg-secondary z-100'
    >
      <span className='text-base'>Recipe of the Day</span>
      <h1 className='text-2xl font-semibold mb-3'>{recipe.title}</h1>

      <RecipeAuthor recipe={recipe} avatarSize={20} />
    </article>
  );
});

RecipeInfo.displayName = 'RecipeInfo';
export default RecipeInfo;
