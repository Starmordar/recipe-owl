import type { PropsWithChildren } from 'react';

interface AuthHeaderProps extends PropsWithChildren {
  title: string;
}

function AuthHeader({ title, children }: AuthHeaderProps) {
  return (
    <div className='flex flex-col text-center text-sm md:text-base'>
      <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{title}</h1>
      {children}
    </div>
  );
}

export { AuthHeader };
