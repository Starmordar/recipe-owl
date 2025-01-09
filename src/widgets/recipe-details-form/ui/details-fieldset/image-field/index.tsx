'use client';

import { Camera, Pencil, Image as LucideImage } from 'lucide-react';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { ImageUploadDrawer } from '@/src/shared/ui/image-upload-drawer';

import { FileInputs, FileUploadHandles } from './file-inputs';

import type { FormValues } from '../../../model/schema';
import type { UseFormReturn } from 'react-hook-form';

interface ImageFieldProps {
  form: UseFormReturn<FormValues>;
}

function ImageField({ form }: ImageFieldProps) {
  const t = useTranslations('RecipeFormPage.Form.Fields');

  const [selectedImage, setSelectedImage] = useState<string | null>(getInitialImage);
  const fileInputsRef = useRef<FileUploadHandles>(null);

  function getInitialImage() {
    const initialImage = form.getValues('image') || null;
    if (initialImage === null || typeof initialImage === 'string') return initialImage;
    return URL.createObjectURL(initialImage);
  }

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...value: Array<unknown>) => void,
  ) {
    const file = event.target.files?.[0] ?? null;
    if (file === null) return;

    onChange(file);
    setSelectedImage(URL.createObjectURL(file));
  }

  function handleTriggerUpload() {
    fileInputsRef.current?.onUpload();
  }

  function handleTriggerTakePhoto() {
    fileInputsRef.current?.onTakePhoto();
  }

  return (
    <div className='relative flex w-full h-[40vh] bg-muted rounded-lg'>
      <FormField
        control={form.control}
        name='image'
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem className='sr-only'>
            <FormControl>
              <FileInputs
                onUpload={event => handleFileUpload(event, onChange)}
                fieldProps={fieldProps}
                ref={fileInputsRef}
              />
            </FormControl>

            <FormMessage className='absolute bottom-1 text-center' />
          </FormItem>
        )}
      />

      {selectedImage ? (
        <>
          <NextImage
            className='rounded-lg'
            src={selectedImage}
            alt=''
            fill
            style={{ objectFit: 'cover' }}
          />

          <ImageUploadDrawer onTakePhoto={handleTriggerTakePhoto} onUpload={handleTriggerUpload}>
            <div className='absolute bottom-3 right-3 cursor-pointer'>
              <div className='bg-background h-9 w-9 border rounded-full flex items-center justify-center'>
                <Pencil className='h-5 w-5' />
              </div>
            </div>
          </ImageUploadDrawer>
        </>
      ) : (
        <ImageUploadDrawer onTakePhoto={handleTriggerTakePhoto} onUpload={handleTriggerUpload}>
          <div className='flex w-full justify-center items-center cursor-pointer'>
            <div className='flex w-full justify-center items-center'>
              <LucideImage className='h-28 w-28 opacity-50' strokeWidth={1} />

              <div className='absolute bottom-6 mx-auto flex items-center gap-x-2'>
                <Camera className='h-6 w-6 text-muted-foreground' />
                <p className='text-muted-foreground'>{t('imageTitle')}</p>
              </div>
            </div>
          </div>
        </ImageUploadDrawer>
      )}
    </div>
  );
}

export { ImageField };
