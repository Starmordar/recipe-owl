'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

import type { PropsWithChildren } from 'react';

interface ImageUploadDrawerProps extends PropsWithChildren {
  onTakePhoto: () => void;
  onUpload: () => void;
}

function ImageUploadDrawer({ children, onTakePhoto, onUpload }: ImageUploadDrawerProps) {
  const t = useTranslations('RecipeForm.AddImage');

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className='sr-only'>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>

        <ul className='my-4'>
          <li>
            <DrawerClose asChild>
              <DrawerActionButton onClick={onTakePhoto}>
                <Camera className='h-5 w-5 opacity-60' /> {t('takePicture')}
              </DrawerActionButton>
            </DrawerClose>
          </li>

          <li>
            <DrawerClose asChild>
              <DrawerActionButton onClick={onUpload}>
                <ImageIcon className='h-5 w-5 opacity-60' /> {t('chooseFromGallery')}
              </DrawerActionButton>
            </DrawerClose>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export { ImageUploadDrawer };
