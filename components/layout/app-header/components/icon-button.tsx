'use client';

import { cloneElement, forwardRef } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderIconButtonProps extends ButtonProps {
  className?: string;
  Icon: JSX.Element;
}

const HeaderIconButton = forwardRef<HTMLButtonElement, HeaderIconButtonProps>(
  ({ className, Icon, ...props }: HeaderIconButtonProps, ref) => {
    return (
      <Button
        className={cn(className, 'relative rounded-full')}
        variant='ghost'
        size='icon-xs'
        ref={ref}
        {...props}
      >
        {cloneElement(Icon, { className: 'h-5 w-5' })}
      </Button>
    );
  },
);

HeaderIconButton.displayName = 'HeaderIconButton';
export default HeaderIconButton;
