import React from 'react';

import Image from 'next/image';
import picture from '../public/test.jpg';

import type { Recipe } from '@/types/recipe';

interface RecipePreviewCardProps {
  recipe: Recipe;
}

export default function RecipePreviewCard({ recipe }: RecipePreviewCardProps) {
  return (
    <div className="flex flex-col basis-1/2">
      <Image
        className="rounded-lg"
        src={picture}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <div>
        <p>{recipe.name}</p>
      </div>
    </div>
  );
}
