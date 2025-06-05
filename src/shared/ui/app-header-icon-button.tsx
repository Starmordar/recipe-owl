'use client';

import { cloneElement, forwardRef, PropsWithChildren, type JSX } from 'react';

import { cn } from '@/src/shared/lib/classnames';
import { Button, ButtonProps } from '@/src/shared/ui/button';

interface HeaderIconButtonProps extends ButtonProps, PropsWithChildren {
  className?: string;
  Icon: JSX.Element;
}

const HeaderIconButton = forwardRef<HTMLButtonElement, HeaderIconButtonProps>(
  ({ className, Icon, children, ...props }: HeaderIconButtonProps, ref) => {
    return (
      <Button
        className={cn(className, 'relative rounded-full')}
        variant='ghost'
        size='icon-xs'
        ref={ref}
        {...props}
      >
        {cloneElement(Icon, { className: 'h-6 w-6' })}
        {children}
      </Button>
    );
  },
);

HeaderIconButton.displayName = 'HeaderIconButton';
export default HeaderIconButton;
