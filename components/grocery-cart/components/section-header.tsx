import { cloneElement, PropsWithChildren } from 'react';

import { CardTitle } from '@/components/ui/card';

interface SectionHeaderProps extends PropsWithChildren {
  title: string;
  subtitle: string;
  Icon: JSX.Element;
}

function SectionHeader({ title, subtitle, Icon, children }: SectionHeaderProps) {
  return (
    <>
      <div className='flex items-center justify-center rounded-lg min-w-[15vw] w-[15vw] h-[15vw] bg-muted'>
        {cloneElement(Icon, { className: 'h-10 w-10 opacity-75', strokeWidth: 1 })}
      </div>

      <div className='flex w-full'>
        <div className='flex flex-col w-full'>
          <CardTitle className='text-lg'>{title}</CardTitle>
          <p className='text-sm text-muted-foreground'>{subtitle}</p>
        </div>
        {children}
      </div>
    </>
  );
}

export default SectionHeader;
