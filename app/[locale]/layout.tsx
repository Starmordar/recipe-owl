import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { appMetadata, BaseLayout } from '@/src/app';
import { routing } from '@/src/shared/i18n/routing';

import type { Locale } from '@/src/shared/i18n/requests';

export async function generateMetadata() {
  const t = await getTranslations('Metadata');
  return appMetadata(t);
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

async function LocaleLayout({ params, children }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}

export default LocaleLayout;
