'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import RecipeImage from './recipe-image';
import RecipeInfo from './recipe-info';

import type { RecipeWithUser } from '@/entities/recipe';

interface Props {
  recipe: RecipeWithUser;
}

function RecipeContent({ recipe }: Props) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);

  const [imageHeight, setImageHeight] = useState(Infinity);
  const [infoHeight, setInfoHeight] = useState(Infinity);

  useLayoutEffect(() => {
    setImageHeight(imageContainerRef.current?.offsetHeight ?? 0);
    setInfoHeight((infoContainerRef.current?.offsetHeight ?? 0) - 40);
  }, []);

  return (
    <section className='relative'>
      <RecipeImage
        ref={imageContainerRef}
        imageHeight={imageHeight}
        infoHeight={infoHeight}
        recipe={recipe}
      />

      <RecipeInfo ref={infoContainerRef} recipe={recipe} />
    </section>
  );
}

export default RecipeContent;
