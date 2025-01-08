'use client';

import { Camera, Image as ImageIcon } from 'lucide-react';

import { Accordion } from '@/src/shared/ui/accordion';
import {
  Drawer,
  DrawerActionButton,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';

import { DisplaySettings } from './display-settings';

import type { PropsWithChildren } from 'react';

interface SettingsDrawerProps extends PropsWithChildren {}

function SettingsDrawer({ children }: SettingsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className='h-[40%]'>
        <DrawerHeader className='sr-only'>
          <DrawerTitle>System Settings</DrawerTitle>
          <DrawerDescription>Update App Settings</DrawerDescription>
        </DrawerHeader>

        <div className='p-4'>
          <DisplaySettings />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { SettingsDrawer };
