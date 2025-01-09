'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, useEffect, useRef } from 'react';

import { recipeQueries } from '@/src/entities/recipe';

import { RecipeCards } from '../recipe-cards';

interface InfiniteLoadProps extends PropsWithChildren {
  search: string;
  filters: Record<string, string | Array<string> | undefined>;
}

function InfiniteLoad({ search, filters, children }: InfiniteLoadProps) {
  const t = useTranslations('RecipesPage');
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    recipeQueries.searchRecipes(search, filters, 1),
  );

  useEffect(() => {
    const ref = observerRef.current;
    if (!ref) return;

    function onIntersectionChange(entries: Array<IntersectionObserverEntry>) {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
    }

    const observer = new IntersectionObserver(onIntersectionChange, { root: null });

    observer.observe(ref);
    return () => observer.unobserve(ref);
  }, [isFetchingNextPage, fetchNextPage]);

  return (
    <div className='relative grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {children}

      {data?.pages.map((recipes, i) => <RecipeCards key={i} recipes={recipes} />)}

      <div className='absolute bottom-10 h-0 w-0' ref={observerRef}></div>
      <div className='text-lg'>
        {isFetching && !isFetchingNextPage ? t('loadingRecipes') : null}
      </div>
    </div>
  );
}

export { InfiniteLoad };
