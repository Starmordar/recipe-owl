import { useTranslations } from 'next-intl';

import type { ToasterToast } from '@/src/shared/ui/use-toast';

function successToast(t: ReturnType<typeof useTranslations>): Omit<ToasterToast, 'id'> {
  return {
    title: t('successfullyAdded'),
  };
}

function alreadyInCartToast(t: ReturnType<typeof useTranslations>): Omit<ToasterToast, 'id'> {
  return {
    title: t('alreadyInCart'),
    variant: 'destructive',
  };
}
export { successToast, alreadyInCartToast };
