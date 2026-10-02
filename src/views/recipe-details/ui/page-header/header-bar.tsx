'use client';

import { cn } from '@/src/shared/lib/classnames';

import { useIsScrolledPast } from '../scroll-marker-provider';

import type { PropsWithChildren, ReactNode } from 'react';

const buttons = cn(
  '[&_button]:pointer-events-auto [&_button]:h-9 [&_button]:w-9 [&_button]:rounded-full',
  '[&_svg]:h-5 [&_svg]:w-5',
  // From `lg` up the buttons show their labels, so they are as wide as their content.
  'lg:[&_button]:w-auto lg:[&_button]:min-w-9 lg:[&_button]:rounded-md',
  'lg:[&_svg]:h-4 lg:[&_svg]:w-4',
);

// While the header floats over the recipe image, every button gets its own backdrop.
const floatingButtons =
  'max-lg:[&_button]:bg-background/90 max-lg:[&_button]:shadow-sm max-lg:[&_button]:ring-1 max-lg:[&_button]:ring-border max-lg:[&_button]:backdrop-blur';

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
        // From `lg` up the photo sits beside the title, so the header never floats over it.
        'lg:mb-0 lg:border-border lg:bg-background lg:pointer-events-auto',
      )}
    >
      <div
        className={cn(
          'container flex h-full items-center gap-x-2 lg:max-w-6xl lg:px-8',
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

        <div className='flex gap-x-2 lg:[&_button]:border lg:[&_button]:border-input'>
          {children}
        </div>
      </div>
    </header>
  );
}

export { HeaderBar };
