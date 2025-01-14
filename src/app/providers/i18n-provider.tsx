import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

async function I18nProvider({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}

export { I18nProvider };
