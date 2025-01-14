'use client';

import { useTranslations } from 'next-intl';

import { Accordion } from '@/src/shared/ui/accordion';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';

import { DisplaySettings } from './display-settings';
import { LanguageSettings } from './language-settings';

import type { PropsWithChildren } from 'react';

interface SettingsDrawerProps extends PropsWithChildren {}

function SettingsDrawer({ children }: SettingsDrawerProps) {
  const t = useTranslations('ProfilePage.SettingsDrawer');

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className='h-[40%]'>
        <DrawerHeader className='sr-only'>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>

        <div className='p-4'>
          <Accordion type='multiple'>
            <DisplaySettings />
            <LanguageSettings />
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { SettingsDrawer };
