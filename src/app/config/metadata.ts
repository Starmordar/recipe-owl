import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

function appMetadata(t: ReturnType<typeof useTranslations>): Metadata {
  return {
    title: t('App.title'),
    description: t('App.description'),
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: t('App.keywords'),
    authors: [{ name: t('App.authorName'), url: 'https://github.com/Starmordar' }],
    icons: [
      { rel: 'apple-touch-icon', url: 'icons/icon_x128.png' },
      { rel: 'icon', url: 'icons/icon_x128.png' },
    ],
    openGraph: {
      images: ['icons/icon_x512.png'],
    },
  };
}

export { appMetadata };
