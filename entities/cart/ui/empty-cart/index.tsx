import { ShoppingCart } from 'lucide-react';

function EmptyCart() {
  return (
    <div className='text-center space-y-2 flex flex-col pt-[15vh] items-center px-5'>
      <ShoppingCart className='h-20 w-20' />
      <h2 className='text-3xl font-semibold'>Empty Cart</h2>
      <p>Place the recipe here to buy them right away or not to forget later.</p>
    </div>
  );
}

export { EmptyCart };
