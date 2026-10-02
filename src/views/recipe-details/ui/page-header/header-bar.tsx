'use client';

import { cn } from '@/src/shared/lib/classnames';

import { useIsScrolledPast } from '../scroll-marker-provider';

import type { PropsWithChildren, ReactNode } from 'react';

const buttons = cn(
  '[&_button]:pointer-events-auto [&_button]:h-9 [&_button]:w-9 [&_button]:rounded-full',
  '[&_svg]:h-5 [&_svg]:w-5',
);

// While the header floats over the recipe image, every button gets its own backdrop.
const floatingButtons =
  '[&_button]:bg-background/90 [&_button]:shadow-sm [&_button]:ring-1 [&_button]:ring-border [&_button]:backdrop-blur';

interface HeaderBarProps extends PropsWithChildren {
  title: string;
  backButton: ReactNode;
}

function HeaderBar({ title, backButton, children }: HeaderBarProps) {
  const isSolid = useIsScrolledPast('photo');
  const isTitleVisible = useIsScrolledPast('title');

  return (
    <header
      className={cn(
        'sticky top-0 z-50 -mb-14 h-14 w-full border-b transition-colors duration-200',
        isSolid ? 'border-border bg-background' : 'border-transparent pointer-events-none',
      )}
    >
      <div
        className={cn(
          'container flex h-full items-center gap-x-2',
          buttons,
          !isSolid && floatingButtons,
        )}
      >
        {backButton}

        <p
          className={cn(
            'min-w-0 flex-1 truncate font-semibold transition-opacity duration-200',
            !isTitleVisible && 'opacity-0',
          )}
          aria-hidden='true'
        >
          {title}
        </p>

        <div className='flex gap-x-2'>{children}</div>
      </div>
    </header>
  );
}

export { HeaderBar };
