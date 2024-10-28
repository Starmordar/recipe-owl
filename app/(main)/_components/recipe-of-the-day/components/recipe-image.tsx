'use client';

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { forwardRef } from 'react';

import type { RecipeWithUser } from '@/src/entities/recipe';
import type { RefObject } from 'react';

interface Props {
  recipe: RecipeWithUser;
  imageHeight: number;
  infoHeight: number;
}

const RecipeImage = forwardRef<HTMLDivElement, Props>(
  ({ recipe, infoHeight, imageHeight }, ref) => {
    const { scrollY } = useScroll({
      target: ref as RefObject<HTMLDivElement>,
      offset: ['start start', 'end start'],
    });

    const finalScale = 1.05;
    const scale = useTransform(scrollY, [0, infoHeight], [1, finalScale]);

    const clipBottom = useTransform(
      scrollY,
      [infoHeight, imageHeight * finalScale + infoHeight],
      [`${imageHeight}px`, '0px'],
    );

    const clipPath = useMotionTemplate`polygon(0 0, 100% 0, 100% ${clipBottom}, 0 ${clipBottom})`;

    return (
      <>
        <div
          ref={ref}
          className='fixed w-full h-[55vh]'
          role='img'
          aria-label={`Recipe image for ${recipe.title}`}
        >
          <motion.div
            className='absolute inset-0 z-0 bg-center bg-cover'
            initial={{ clipPath: 'none' }}
            style={{ scale, clipPath }}
          >
            <Image
              className='object-cover'
              src={recipe.imageUrl}
              alt={`Recipe of the day: ${recipe.title}`}
              fill
              sizes='(max-width: 768px) 75vw, 33vw'
              priority
            />
          </motion.div>
        </div>

        <div className='h-[55vh]' aria-hidden='true'></div>
      </>
    );
  },
);

RecipeImage.displayName = 'RecipeImage';
export default RecipeImage;
