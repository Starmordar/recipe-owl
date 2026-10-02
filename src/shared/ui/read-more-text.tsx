'use client';

import { useTranslations } from 'next-intl';
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '../lib/classnames';

import type { PropsWithChildren } from 'react';

interface ReadMoreTextProps extends PropsWithChildren {
  className?: string;
  clampClassName?: string;
}

const ReadMoreText = forwardRef<HTMLDivElement, ReadMoreTextProps>(
  ({ className, clampClassName = 'line-clamp-5', children }, ref) => {
    const t = useTranslations('Common.ReadMoreText');
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isOveflowed, setIsOverflowed] = useState(false);

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    useLayoutEffect(() => {
      if (!textRef.current) return;

      if (textRef.current.scrollHeight > textRef.current.clientHeight) {
        setIsOverflowed(true);
      }
    }, []);

    return (
      <div ref={containerRef} className={cn('text-base', className)}>
        <p ref={textRef} className={cn(!isExpanded && clampClassName)}>
          {children}
        </p>

        {isOveflowed && (
          <button
            type='button'
            className='mt-0.5 text-primary'
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(value => !value)}
          >
            {isExpanded ? t('showLess') : t('showMore')}
          </button>
        )}
      </div>
    );
  },
);

ReadMoreText.displayName = 'ReadMoreText';
export { ReadMoreText };
