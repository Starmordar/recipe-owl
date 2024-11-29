'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { forwardRef } from 'react';

import type { RecipeWithUser } from '@/src/entities/recipe';
import type { RefObject } from 'react';

interface RecipeImageProps {
  recipe: RecipeWithUser;
  imageHeight: number;
  infoHeight: number;
}

const RecipeImage = forwardRef<HTMLDivElement, RecipeImageProps>(
  ({ recipe, infoHeight, imageHeight }, ref) => {
    const { scrollY } = useScroll({
      target: ref as RefObject<HTMLDivElement>,
      offset: ['start start', 'end start'],
    });

    const scale = useTransform(scrollY, [0, infoHeight], [1, 1.1]);

    return (
      <>
        <div
          ref={ref}
          className='fixed w-full h-[55vh]'
          role='img'
          aria-label={`Recipe image for ${recipe.title}`}
        >
          <m.div
            className='absolute inset-0 z-0 bg-center bg-cover'
            initial={{ clipPath: 'none' }}
            style={{ scale }}
          >
            <Image
              className='object-cover'
              src={recipe.imageUrl}
              alt={`Recipe of the day: ${recipe.title}`}
              fill
              sizes='(max-width: 768px) 400px, 33vw'
              priority
            />
          </m.div>
        </div>

        <div className='h-[55vh]' aria-hidden='true'></div>
      </>
    );
  },
);

RecipeImage.displayName = 'RecipeImage';
export { RecipeImage };
