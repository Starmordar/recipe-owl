'use client';

import Link from 'next/link';

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

interface RequireAuthDrawerProps extends PropsWithChildren {
  title: string;
  description: string;
}

function RequireAuthDrawer({ title, description, children }: RequireAuthDrawerProps) {
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
            <Button className='relative w-full mb-2'>Sign In</Button>
          </Link>

          <AuthLegalSection />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { RequireAuthDrawer };
