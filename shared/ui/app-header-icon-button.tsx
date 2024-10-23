'use client';

import { cloneElement, forwardRef, PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/classnames';
import { Button, ButtonProps } from '@/shared/ui/button';

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
        {cloneElement(Icon, { className: 'h-5 w-5' })}
        {children}
      </Button>
    );
  },
);

HeaderIconButton.displayName = 'HeaderIconButton';
export default HeaderIconButton;
