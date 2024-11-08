'use client';

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '../lib/classnames';

import type { PropsWithChildren } from 'react';

interface ReadMoreTextProps extends PropsWithChildren {
  className?: string;
}

const ReadMoreText = forwardRef<HTMLDivElement, ReadMoreTextProps>(
  ({ className, children }, ref) => {
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
          className,
          !isExpanded && 'line-clamp-5',
          'relative text-base overflow-hidden bg-background',
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
              {isExpanded ? 'Read Less' : 'Read more'}
            </span>
          )}
        </p>
      </div>
    );
  },
);

ReadMoreText.displayName = 'ReadMoreText';
export { ReadMoreText };
