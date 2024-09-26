import { cloneElement, PropsWithChildren } from 'react';

import { CardTitle } from '@/components/ui/card';

interface SectionHeaderProps extends PropsWithChildren {
  title: string;
  Icon: JSX.Element;
}

function SectionHeader({ title, Icon, children }: SectionHeaderProps) {
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

export default SectionHeader;
