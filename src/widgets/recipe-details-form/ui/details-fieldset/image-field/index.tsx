'use client';

import { Camera, Pencil } from 'lucide-react';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { cn } from '@/src/shared/lib/classnames';
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
    <div
      className={cn(
        'relative flex w-full aspect-[4/3] rounded-2xl overflow-hidden md:aspect-video lg:aspect-[4/3]',
        !selectedImage && 'border border-dashed border-muted-foreground/40 bg-muted/50',
      )}
    >
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
          <NextImage src={selectedImage} alt='' fill style={{ objectFit: 'cover' }} />

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
          <button
            type='button'
            className='flex w-full flex-col items-center justify-center gap-y-1 px-4 text-center'
          >
            <Camera className='mb-1 h-7 w-7 text-primary' aria-hidden='true' />
            <span className='font-medium'>{t('imageTitle')}</span>
            <span className='text-sm text-muted-foreground'>{t('imageDescription')}</span>
          </button>
        </ImageUploadDrawer>
      )}
    </div>
  );
}

export { ImageField };
