'use client';

import { LazyMotion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';

import { RecipeImage } from './recipe-image';
import { RecipeInfo } from './recipe-info';

import type { RecipeWithUser } from '@/src/entities/recipe';

interface RecipeContentProps {
  recipe: RecipeWithUser;
}

function RecipeContent({ recipe }: RecipeContentProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);

  const [imageHeight, setImageHeight] = useState(Infinity);
  const [infoHeight, setInfoHeight] = useState(Infinity);

  useLayoutEffect(() => {
    setImageHeight(imageContainerRef.current?.offsetHeight ?? 0);
    setInfoHeight((infoContainerRef.current?.offsetHeight ?? 0) - 40);
  }, []);

  const loadAnimationFeatures = () =>
    import('@/src/shared/lib/framer-motion/dom-animation').then(res => res.default);

  return (
    <LazyMotion features={loadAnimationFeatures} strict>
      <section className='relative md:container md:min-h-[28rem] lg:min-h-[32rem] md:grid md:border-b grid-cols-4 items-center'>
        <RecipeImage
          ref={imageContainerRef}
          imageHeight={imageHeight}
          infoHeight={infoHeight}
          recipe={recipe}
        />

        <RecipeInfo ref={infoContainerRef} recipe={recipe} />
      </section>
    </LazyMotion>
  );
}

export { RecipeContent };
