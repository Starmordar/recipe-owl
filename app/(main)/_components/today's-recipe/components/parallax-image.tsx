'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

import RecipeAuthor from '@/components/recipe-details/components/recipe-author';
import { RecipeDetails } from '@/types/api';

interface ParallaxImageProps {
  recipe: RecipeDetails;
}

function ParallaxImage({ recipe }: ParallaxImageProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);

  const [infoHeight, setInfoHeight] = useState(Infinity);

  useLayoutEffect(() => {
    const infoHeight = infoContainerRef.current?.offsetHeight ?? 0;
    setInfoHeight(infoHeight - 30);
  }, []);

  const { scrollY } = useScroll({
    target: imageContainerRef,
    offset: ['start start', 'end start'],
  });

  const xPadding = 50;
  const backgroundY = useTransform(scrollY, [0, infoHeight + xPadding], ['0px', `${infoHeight}px`]);
  const scaleY = useTransform(scrollY, [0, infoHeight + xPadding], [1, 1.05]);
  const transform = useMotionTemplate`translateY(${backgroundY}) scale(${scaleY})`;

  return (
    <>
      <div ref={imageContainerRef} className='relative w-fill h-[45vh]'>
        <motion.div
          className='absolute inset-0 z-0 bg-center bg-cover'
          style={{ backgroundImage: `url(${recipe.imageUrl})`, transform }}
        ></motion.div>
      </div>

      <div className='relative'>
        <div
          ref={infoContainerRef}
          className='absolute left-1/2 -top-10 transform -translate-x-1/2 flex flex-col p-4 w-[80vw] rounded-lg bg-orange-50 z-100'
        >
          <span className='text-base mb-2'>Today&apos;s Recipe</span>
          <h1 className='text-2xl font-semibold mb-4'>{recipe.title}</h1>

          <RecipeAuthor recipe={recipe} avatarSize={20} />
        </div>
      </div>
    </>
  );
}

export default ParallaxImage;
