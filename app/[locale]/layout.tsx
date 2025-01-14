import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { appMetadata, BaseLayout } from '@/src/app';
import { routing } from '@/src/shared/i18n/routing';

import type { Locale } from '@/src/shared/i18n/requests';

export async function generateMetadata() {
  const t = await getTranslations('Metadata');
  return appMetadata(t);
}

async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: Locale } }>) {
  if (!routing.locales.includes(locale)) notFound();

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}

export default LocaleLayout;
