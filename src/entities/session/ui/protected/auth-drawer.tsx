'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { AuthLegalSection } from '@/src/entities/session';
import { publicUrls } from '@/src/shared/config/url';
import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';

import type { PropsWithChildren } from 'react';

interface AuthDrawerProps extends PropsWithChildren {
  title: string;
  description: string;
}

function AuthDrawer({ title, description, children }: AuthDrawerProps) {
  const t = useTranslations('AuthPage');

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className='mx-6 mb-6'>
          <Link href={publicUrls.signIn}>
            <Button className='relative w-full mb-2'>{t('authAction')}</Button>
          </Link>

          <AuthLegalSection />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { AuthDrawer };
