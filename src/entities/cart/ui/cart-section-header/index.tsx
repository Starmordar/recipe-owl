import { cloneElement, PropsWithChildren, type JSX } from 'react';

import { CardTitle } from '@/src/shared/ui/card';

interface CartSectionHeaderProps extends PropsWithChildren {
  title: string;
  Icon: JSX.Element;
}

function CartSectionHeader({ title, Icon, children }: CartSectionHeaderProps) {
  return (
    <div className='flex items-center w-full gap-x-4'>
      <div className='flex items-center justify-center rounded-lg min-w-10 w-10 h-10 bg-muted'>
        {cloneElement(Icon, { className: 'h-6 w-6 opacity-75', strokeWidth: 1 })}
      </div>

      <div className='flex w-full'>
        <div className='flex flex-col w-full'>
          <CardTitle className='text-base'>{title}</CardTitle>
        </div>
        {children}
      </div>
    </div>
  );
}

export { CartSectionHeader };
