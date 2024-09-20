'use client';

import { Camera, Image as LucideImage } from 'lucide-react';
import NextImage from 'next/image';
import { useState } from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { acceptedImageMimeTypes } from '@/constants/image';

import type { FormValues } from '../constants/shema';
import type { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

interface ImageUploadFieldProps {
  form: UseFormReturn<FormValues>;
}

function ImageUploadField({ form }: ImageUploadFieldProps) {
  const initialImage = form.getValues('image') || null;
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage);

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...value: Array<unknown>) => void,
  ) {
    const file = event.target.files?.[0] ?? null;
    if (file === null) return;

    onChange(file);
    setSelectedImage(URL.createObjectURL(file));
  }

  return (
    <div className='relative flex w-full h-[40vh] bg-muted rounded-lg'>
      {selectedImage ? (
        <>
          <NextImage
            className='rounded-lg'
            src={selectedImage}
            alt='Uploaded Image'
            fill
            style={{ objectFit: 'cover' }}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel htmlFor='fileInput' className='absolute bottom-3 right-3 cursor-pointer'>
                  <FormControl>
                    <div className='flex w-full justify-center items-center'>
                      <UploadInput
                        onUpload={event => handleFileUpload(event, onChange)}
                        fieldProps={fieldProps}
                      />

                      <div className='relative bg-primary/80 border rounded-md px-3 py-1 flex items-center gap-x-4'>
                        <Camera className='h-5 w-5 text-primary-foreground' />
                        <p className='text-primary-foreground'>Edit</p>
                      </div>
                    </div>
                  </FormControl>
                </FormLabel>

                <FormMessage className='absolute bottom-1 text-center' />
              </FormItem>
            )}
          />
        </>
      ) : (
        <FormField
          control={form.control}
          name='image'
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className='flex w-full justify-center items-center cursor-pointer'>
              <FormLabel className='flex h-full w-full cursor-pointer' htmlFor='fileInput'>
                <FormControl>
                  <div className='flex w-full justify-center items-center'>
                    <UploadInput
                      onUpload={event => handleFileUpload(event, onChange)}
                      fieldProps={fieldProps}
                    />
                    <LucideImage className='h-20 w-20 opacity-50' strokeWidth={1} />

                    <div className='absolute bottom-6 mx-auto flex items-center gap-x-4'>
                      <Camera className='h-5 w-5 text-muted-foreground' strokeWidth={1} />
                      <p className='text-muted-foreground'>Upload recipe photo</p>
                    </div>
                  </div>
                </FormControl>
              </FormLabel>

              <FormMessage className='absolute bottom-1 text-center' />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

interface UploadInputProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fieldProps: Partial<ControllerRenderProps>;
}

function UploadInput({ onUpload, fieldProps }: UploadInputProps) {
  return (
    <Input
      {...fieldProps}
      className='hidden'
      type='file'
      placeholder='Recipe Image'
      id='fileInput'
      accept={acceptedImageMimeTypes.join(', ')}
      onChange={onUpload}
    />
  );
}

export default ImageUploadField;
