'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { Camera, Image as ImageIcon } from 'lucide-react';

import {
  Drawer,
  DrawerActionButton,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';

import type { PropsWithChildren } from 'react';

interface ImageUploadDrawerProps extends PropsWithChildren {
  onTakePhoto: () => void;
  onUpload: () => void;
}

function ImageUploadDrawer({ children, onTakePhoto, onUpload }: ImageUploadDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Action Buttons</DialogTitle>

        <ul className='my-4'>
          <li>
            <DrawerClose asChild>
              <DrawerActionButton onClick={onTakePhoto}>
                <Camera className='h-5 w-5 opacity-60' /> Take a Picture
              </DrawerActionButton>
            </DrawerClose>
          </li>

          <li>
            <DrawerClose asChild>
              <DrawerActionButton onClick={onUpload}>
                <ImageIcon className='h-5 w-5 opacity-60' /> Choose from Gallery
              </DrawerActionButton>
            </DrawerClose>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default ImageUploadDrawer;
