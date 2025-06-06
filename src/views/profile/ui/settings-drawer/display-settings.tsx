'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/src/shared/ui/accordion';
import { Label } from '@/src/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/shared/ui/radio-group';

function DisplaySettings() {
  const t = useTranslations('ProfilePage.SettingsDrawer.Display');
  const { theme, setTheme } = useTheme();

  return (
    <AccordionItem value='display'>
      <AccordionTrigger>{t('title')}</AccordionTrigger>

      <AccordionContent>
        <RadioGroup defaultValue={theme} onValueChange={setTheme}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='system' id='system' />
            <Label htmlFor='system'>{t('systemOption')}</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='light' id='light' />
            <Label htmlFor='light'>{t('lightOption')}</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='dark' id='dark' />
            <Label htmlFor='dark'>{t('darkOption')}</Label>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
}

export { DisplaySettings };
