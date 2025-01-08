import Negotiator from 'negotiator';
import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { i18nConfig } from './config';

export default getRequestConfig(async () => {
  function getLocale() {
    const locale = cookies().get(i18nConfig.cookiesName)?.value;
    if (locale) return locale;

    const languages = new Negotiator({
      headers: { 'accept-language': headers().get('accept-language') ?? '' },
    }).languages();

    const supportedLocale = languages.find(language => {
      const [locale] = language.split('-');
      return i18nConfig.allowedLocales.includes(locale);
    });

    return supportedLocale ?? i18nConfig.defaultLocale;
  }

  const locale = getLocale();

  return {
    locale: getLocale(),
    messages: (await import(`../../../messages/${locale}.json`)).default,
  };
});
