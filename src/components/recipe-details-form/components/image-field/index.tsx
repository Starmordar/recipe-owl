'use client';

import { Camera, Pencil, Image as LucideImage } from 'lucide-react';
import NextImage from 'next/image';
import { useRef, useState } from 'react';

import { FormControl, FormField, FormItem, FormMessage } from '@/src/shared/ui/form';
import { ImageUploadDrawer } from '@/src/shared/ui/image-upload-drawer';

import FileInputs, { FileUploadHandles } from './components/file-inputs';

import type { FormValues } from '../../constants/shema';
import type { UseFormReturn } from 'react-hook-form';

interface ImageUploadFieldProps {
  form: UseFormReturn<FormValues>;
}

function ImageUploadField({ form }: ImageUploadFieldProps) {
  const initialImage = form.getValues('image') || null;
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage);
  const fileInputsRef = useRef<FileUploadHandles>(null);

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
            alt='Uploaded Image'
            fill
            style={{ objectFit: 'cover' }}
          />

          <ImageUploadDrawer onTakePhoto={handleTriggerTakePhoto} onUpload={handleTriggerUpload}>
            <div className='absolute bottom-3 right-3 cursor-pointer'>
              <div className='bg-background h-7 w-7 border rounded-full flex items-center justify-center'>
                <Pencil className='h-4 w-4' strokeWidth={1} />
              </div>
            </div>
          </ImageUploadDrawer>
        </>
      ) : (
        <ImageUploadDrawer onTakePhoto={handleTriggerTakePhoto} onUpload={handleTriggerUpload}>
          <div className='flex w-full justify-center items-center cursor-pointer'>
            <div className='flex w-full justify-center items-center'>
              <LucideImage className='h-20 w-20 opacity-50' strokeWidth={1} />

              <div className='absolute bottom-6 mx-auto flex items-center gap-x-2'>
                <Camera className='h-5 w-5 text-muted-foreground' />
                <p className='text-muted-foreground'>Add Recipe Photo</p>
              </div>
            </div>
          </div>
        </ImageUploadDrawer>
      )}
    </div>
  );
}

export default ImageUploadField;
