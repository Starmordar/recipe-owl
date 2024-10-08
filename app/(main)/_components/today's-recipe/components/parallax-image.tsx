'use client';

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
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
      <div ref={imageContainerRef} className='relative w-full h-[45vh]'>
        <motion.div className='absolute inset-0 z-0 bg-center bg-cover' style={{ transform }}>
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

      <section className='relative'>
        <article
          ref={infoContainerRef}
          className='absolute left-1/2 -top-10 transform -translate-x-1/2 flex flex-col p-4 w-[80vw] rounded-lg bg-orange-50 z-100'
        >
          <span className='text-base'>Recipe of the Day</span>
          <h1 className='text-2xl font-semibold mb-3'>{recipe.title}</h1>

          <RecipeAuthor recipe={recipe} avatarSize={20} />
        </article>
      </section>
    </>
  );
}

export default ParallaxImage;
