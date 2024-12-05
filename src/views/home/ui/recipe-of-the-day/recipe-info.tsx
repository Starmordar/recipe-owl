'use client';

import { useMediaQuery } from '@uidotdev/usehooks';
import Link from 'next/link';
import { forwardRef } from 'react';

import { RecipeAuthor, type RecipeWithUser } from '@/src/entities/recipe';
import { publicUrls } from '@/src/shared/config/url';
import { hashColor } from '@/src/shared/lib/color';
import { Button } from '@/src/shared/ui/button';

interface RecipeInfoProps {
  recipe: RecipeWithUser;
}

const RecipeInfo = forwardRef<HTMLDivElement, RecipeInfoProps>(({ recipe }, ref) => {
  return (
    <>
      <article className='hidden md:flex flex-col relative col-span-2 pr-4 lg:pr-8 py-6'>
        <span className='text-lg mb-2'>Recipe of the Day</span>

        <div className='flex flex-col gap-y-4'>
          <h1 className='md:text-4xl lg:text-5xl font-semibold md:font-bold'>{recipe.title}</h1>
          <p className='text-lg break-words line-clamp-5'>{recipe.description}</p>

          <div className='flex flex-col gap-y-2 py-3'>
            {recipe.cookTime && (
              <p>
                Time: <span className='font-semibold'>{recipe.cookTime}</span>
              </p>
            )}
            {recipe.tags.length > 0 && <RecipeTags tags={recipe.tags} />}
          </div>

          <Link href={publicUrls.recipe(recipe.id)} aria-label='Read more about Recipe of the Day'>
            <Button size='lg' className='text-base'>
              Let&apos;s Cook!
            </Button>
          </Link>
          <RecipeAuthor author={recipe.user} avatarSize={28} />
        </div>
      </article>

      <Link
        href={publicUrls.recipe(recipe.id)}
        aria-label='Read more about Recipe of the Day'
        className='flex justify-center md:hidden'
      >
        <article
          ref={ref}
          className='relative transform -translate-y-10 -mb-6 md:transform-none lex flex-col p-4 min-w-96 mx-6 rounded-lg bg-orange-100 z-100'
        >
          <div className='absolute top-4 right-4 z-10 text-sm flex gap-2'>
            {recipe.tags.length > 0 && (
              <div className='bg-lime-200 rounded-xl px-2 py-0.5'>{recipe.tags[0]}</div>
            )}
          </div>

          <span className='text-base'>Recipe of the Day</span>

          <div className='flex flex-col gap-y-4 mt-2'>
            <h1 className='text-3xl font-semibold'>{recipe.title}</h1>
            <RecipeAuthor author={recipe.user} avatarSize={28} />
          </div>
        </article>
      </Link>
    </>
  );
});

RecipeInfo.displayName = 'RecipeInfo';

interface RecipeTagsProps {
  tags: Array<string>;
}

function RecipeTags({ tags }: RecipeTagsProps) {
  return (
    <div className='flex flex-wrap gap-x-1.5 gap-y-2 items-center'>
      Tags:
      {tags.map(tag => (
        <div
          key={tag}
          style={{ borderColor: hashColor(tag) }}
          className='py-0.5 px-2.5 border rounded-lg'
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

export { RecipeInfo };
