import { useTranslations } from 'next-intl';

function getCartShareInfo(t: ReturnType<typeof useTranslations>) {
  return {
    title: t('CartPage.shareCartTitle'),
    text: t('CartPage.shareCartTitle'),
  };
}

export { getCartShareInfo };
