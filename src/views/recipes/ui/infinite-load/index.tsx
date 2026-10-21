'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PropsWithChildren, useEffect, useRef } from 'react';

import { RecipeCardSkeleton, recipeQueries } from '@/src/entities/recipe';

import { RecipeCards } from '../recipe-cards';

const skeletonCards = new Array<number>(4).fill(0);

interface InfiniteLoadProps extends PropsWithChildren {
  search: string;
  filters: Record<string, string | Array<string> | undefined>;
  hasMore: boolean;
}

function InfiniteLoad({ search, filters, hasMore, children }: InfiniteLoadProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // The server renders the first page, so the next one is loaded only when that page was full.
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    ...recipeQueries.searchRecipes(search, filters, 1),
    enabled: hasMore,
  });

  useEffect(() => {
    const ref = observerRef.current;
    if (!ref) return;

    function onIntersectionChange(entries: Array<IntersectionObserverEntry>) {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }

    const observer = new IntersectionObserver(onIntersectionChange, { root: null });

    observer.observe(ref);
    return () => observer.unobserve(ref);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // A background refetch keeps the loaded cards, so placeholders show only while a new page loads.
  const isLoadingPage = isLoading || isFetchingNextPage;

  return (
    <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-5'>
      {children}

      {data?.pages.map((recipes, i) => <RecipeCards key={i} recipes={recipes} />)}

      {isLoadingPage &&
        skeletonCards.map((_, index) => (
          <RecipeCardSkeleton key={index} className='aspect-[4/3]' />
        ))}

      <div className='absolute bottom-10 h-0 w-0' ref={observerRef}></div>
    </div>
  );
}

export { InfiniteLoad };
