import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

function EmptyCart() {
  const t = useTranslations('CartPage');

  return (
    <div className='text-center space-y-2 flex flex-col pt-[15vh] items-center px-5'>
      <ShoppingCart className='h-20 w-20' />
      <h2 className='text-3xl font-semibold'>{t('emptyCartTitle')}</h2>
      <p>{t('emtyCartText')}</p>
    </div>
  );
}

export { EmptyCart };
