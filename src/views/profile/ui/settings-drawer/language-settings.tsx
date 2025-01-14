'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { useRouter, usePathname } from '@/src/shared/i18n/routing';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/src/shared/ui/accordion';
import { Label } from '@/src/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/shared/ui/radio-group';

function LanguageSettings() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const t = useTranslations('ProfilePage.SettingsDrawer.Language');

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onLocaleChange(nextLocale: string) {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <AccordionItem value='language'>
      <AccordionTrigger>{t('title')}</AccordionTrigger>

      <AccordionContent>
        <RadioGroup defaultValue={locale} onValueChange={onLocaleChange}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='en' id='en' />
            <Label htmlFor='en'>{t('english')}</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='ru' id='ru' />
            <Label htmlFor='ru'>{t('russian')}</Label>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
}

export { LanguageSettings };
