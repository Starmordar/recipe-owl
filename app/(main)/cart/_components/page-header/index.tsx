import AppHeader from '@/components/layout/app-header';
import { publicUrls } from '@/config/url';
import { getCart } from '@/lib/data/cart';

import MoreOptionsAction from './components/more-options-action';
import ShareAction from './components/share-action';

interface PageHeaderProps {
  userId: string;
}

async function PageHeader({ userId }: PageHeaderProps) {
  const { cart } = await getCart();

  return (
    <AppHeader prevUrl={publicUrls.recipes} className='pr-2'>
      <div className='flex justify-between grow items-center ml-5'>
        <h1 className='text-lg font-semibold leading-none'>Grocery Cart</h1>

        <div className='flex items-center gap-x-3'>
          {cart && <ShareAction cart={cart} />}
          <MoreOptionsAction userId={userId} />
        </div>
      </div>
    </AppHeader>
  );
}

export default PageHeader;
