'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { i18nConfig } from '@/src/shared/i18n/config';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/src/shared/ui/accordion';
import { Label } from '@/src/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/shared/ui/radio-group';

function LanguageSettings() {
  const t = useTranslations('ProfilePage.SettingsDrawer');
  const router = useRouter();

  function onLocaleChange(locale: string) {
    Cookies.set(i18nConfig.cookiesName, locale);
    router.refresh();
  }

  return (
    <AccordionItem value='language'>
      <AccordionTrigger>{t('languageTitle')}</AccordionTrigger>

      <AccordionContent>
        <RadioGroup
          defaultValue={Cookies.get(i18nConfig.cookiesName) ?? i18nConfig.defaultLocale}
          onValueChange={onLocaleChange}
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='en' id='en' />
            <Label htmlFor='en'>{t('languageEnglish')}</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='ru' id='ru' />
            <Label htmlFor='ru'>{t('languageRussian')}</Label>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
}

export { LanguageSettings };
