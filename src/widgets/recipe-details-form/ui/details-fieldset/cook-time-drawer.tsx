'use client';

import { useTranslations } from 'next-intl';
import { useState, type PropsWithChildren } from 'react';

import { hoursLabel, minutesLabel, parseCookTime } from '@/src/entities/recipe';
import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';
import { WheelPicker } from '@/src/shared/ui/wheel-picker';

interface CookTimeDrawerProps extends PropsWithChildren {
  value: string;
  onChange: (value: string) => void;
}

function CookTimeDrawer({ value, onChange, children }: CookTimeDrawerProps) {
  const t = useTranslations('RecipeForm.CookTimeDrawer');
  const [timeString, setTimeString] = useState(parseCookTime(value));

  function onChangeCookTime(field: 'hours' | 'minutes', nextValue: number) {
    setTimeString(state => ({
      hours: field === 'hours' ? nextValue : state.hours,
      minutes: field === 'minutes' ? nextValue : state.minutes,
    }));
  }

  function handleSetCookTime({ reset }: { reset?: boolean }) {
    if (reset || (timeString.hours === 0 && timeString.minutes === 0)) return onChange('');

    const hoursSection = timeString.hours ? `${timeString.hours} ${hoursLabel}` : '';
    const minutesSection = timeString.minutes ? `${timeString.minutes} ${minutesLabel}` : '';
    onChange(`${hoursSection} ${minutesSection}`.trim());
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>

        <WheelPicker onChange={onChangeCookTime} defaultValue={timeString} />

        <DrawerFooter className='flex flex-row w-full'>
          <DrawerClose className='flex-1' asChild>
            <Button
              className='w-full'
              variant='outline'
              onClick={() => handleSetCookTime({ reset: true })}
            >
              {t('cancel')}
            </Button>
          </DrawerClose>

          <DrawerClose className='flex-1' asChild>
            <Button className='w-full' onClick={() => handleSetCookTime({})}>
              {t('save')}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { CookTimeDrawer };
