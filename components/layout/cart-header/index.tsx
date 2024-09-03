import { Button } from '@/components/ui/button';

import AppHeader from '../app-header';

function CartHeader() {
  return (
    <AppHeader>
      <h1 className='text-lg font-semibold leading-none ml-10'>Product Cart</h1>

      <Button form='recipe-form' size='xss' variant='default' className='px-3'>
        Clear
      </Button>
    </AppHeader>
  );
}

export default CartHeader;
