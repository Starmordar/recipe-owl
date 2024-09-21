import { Cookie } from 'lucide-react';

import { CardTitle } from '@/components/ui/card';

function SharedIngredientsHeader() {
  return (
    <>
      <div className='flex items-center justify-center rounded-lg min-w-[20vw] w-[20vw] h-[20vw] bg-muted'>
        <Cookie className='h-12 w-12 opacity-75' strokeWidth={1} />
      </div>

      <div className='flex flex-col w-full'>
        <CardTitle className='text-lg'>Shared Ingredients</CardTitle>
        <p className='text-sm text-muted-foreground'>Ingredients shared between multiple recipes</p>
      </div>
    </>
  );
}

export default SharedIngredientsHeader;
