import { useTranslations } from 'next-intl';

function getShareInfo(t: ReturnType<typeof useTranslations>) {
  return {
    title: t('title'),
  };
}

export { getShareInfo };
