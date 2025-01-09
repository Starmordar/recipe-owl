import { useTranslations } from 'next-intl';

function getCartShareInfo(t: ReturnType<typeof useTranslations>) {
  return {
    title: t('title'),
    text: t('text'),
  };
}

export { getCartShareInfo };
