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

  const [containerHeight, setContainerHeight] = useState(Infinity);
  const [infoHeight, setInfoHeight] = useState(Infinity);

  useLayoutEffect(() => {
    const infoHeight = infoContainerRef.current?.offsetHeight ?? 0;
    const containerHeight = imageContainerRef.current?.offsetHeight ?? 0;

    setContainerHeight(containerHeight);
    setInfoHeight(infoHeight - 40);
  }, []);

  const { scrollY } = useScroll({
    target: imageContainerRef,
    offset: ['start start', 'end start'],
  });

  const finalScale = 1.05;
  const scale = useTransform(scrollY, [0, infoHeight], [1, finalScale]);

  const clipBottom = useTransform(
    scrollY,
    [infoHeight, containerHeight * finalScale + infoHeight],
    [`${containerHeight}px`, '0px'],
  );

  const clipPath = useMotionTemplate`polygon(0 0, 100% 0, 100% ${clipBottom}, 0 ${clipBottom})`;

  return (
    <>
      <div ref={imageContainerRef} className='fixed w-full h-[55vh]'>
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

      <section aria-label='Recipe of the day details' className='relative'>
        <article
          ref={infoContainerRef}
          className='absolute left-1/2 -top-10 transform -translate-x-1/2 flex flex-col p-4 w-[80vw] rounded-lg bg-orange-50 z-100'
        >
          <span className='text-base'>Recipe of the Day</span>
          <h1 className='text-2xl font-semibold mb-3'>
            {recipe.title}
            {recipe.title}
          </h1>

          <RecipeAuthor recipe={recipe} avatarSize={20} />
        </article>
      </section>
    </>
  );
}

export default ParallaxImage;
