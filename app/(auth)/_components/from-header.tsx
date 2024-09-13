import { PropsWithChildren } from 'react';

interface FormHeaderProps extends PropsWithChildren {
  title: string;
}

function FormHeader({ title, children }: FormHeaderProps) {
  return (
    <div className='flex flex-col text-center text-sm'>
      <h1 className='text-2xl font-semibold mb-2'>{title}</h1>
      {children}
    </div>
  );
}

export default FormHeader;
