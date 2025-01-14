'use client';

import { useTranslations } from 'next-intl';
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '../lib/classnames';

import type { PropsWithChildren } from 'react';

interface ReadMoreTextProps extends PropsWithChildren {
  className?: string;
}

const ReadMoreText = forwardRef<HTMLDivElement, ReadMoreTextProps>(
  ({ className, children }, ref) => {
    const t = useTranslations('Common.ReadMoreText');
    const containerRef = useRef<HTMLDivElement>(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isOveflowed, setIsOverflowed] = useState(false);

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    useLayoutEffect(() => {
      if (!containerRef.current) return;

      if (containerRef.current.scrollHeight > containerRef.current.clientHeight) {
        setIsOverflowed(true);
      }
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn(
          'relative text-base overflow-hidden bg-background',
          className,
          !isExpanded && 'line-clamp-5',
        )}
      >
        <p>
          {children}

          {isOveflowed && (
            <span
              className={cn(
                'cursor-pointer text-primary bg-fade-to-bg pl-2',
                !isExpanded && 'absolute right-0 bottom-0 pl-8',
              )}
              onClick={() => setIsExpanded(value => !value)}
            >
              {isExpanded ? t('showLess') : t('showMore')}
            </span>
          )}
        </p>
      </div>
    );
  },
);

ReadMoreText.displayName = 'ReadMoreText';
export { ReadMoreText };
