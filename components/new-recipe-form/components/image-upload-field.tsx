'use client';

import React from 'react';
import { z } from 'zod';
import type { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, type InputProps } from '@/components/ui/input';
import NextImage from 'next/image';

import schema from '../shema';
import { acceptedImageMimeTypes } from '@/constants/image';
import { Camera, Image } from 'lucide-react';

interface ImageUploadFieldProps {
  form: UseFormReturn<z.infer<typeof schema>>;
}

export default function ImageUploadField({ form }: ImageUploadFieldProps) {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...value: Array<any>) => void
  ) {
    const file = event.target.files?.[0] ?? null;

    onChange(file);
    setSelectedImage(file);
  }

  return (
    <div className="relative flex w-full h-[25vh] bg-muted rounded-lg">
      {selectedImage ? (
        <>
          <NextImage
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded Image"
            fill
            style={{ objectFit: 'cover' }}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormLabel htmlFor="fileInput" className="absolute bottom-3 right-3 cursor-pointer">
                <FormItem>
                  <FormControl>
                    <div className="flex w-full justify-center items-center">
                      <UploadInput
                        onUpload={(event) => handleFileUpload(event, onChange)}
                        fieldProps={fieldProps}
                      />

                      <div className="relative bg-primary/80 border rounded-md px-3 py-1 flex items-center gap-x-4">
                        <Camera className="h-5 w-5 text-primary-foreground" />
                        <p className="text-primary-foreground">Edit</p>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              </FormLabel>
            )}
          />
        </>
      ) : (
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormLabel
              htmlFor="fileInput"
              className="flex w-full justify-center items-center cursor-pointer"
            >
              <FormItem>
                <FormControl>
                  <div className="flex w-full justify-center items-center">
                    <UploadInput
                      onUpload={(event) => handleFileUpload(event, onChange)}
                      fieldProps={fieldProps}
                    />
                    <Image className="h-20 w-20 opacity-50" strokeWidth={1} />

                    <div className="absolute bottom-4 mx-auto flex items-center gap-x-4">
                      <Camera className="h-5 w-5 text-muted-foreground" strokeWidth={1} />
                      <p className="text-muted-foreground">Upload recipe photo</p>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            </FormLabel>
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
      className="hidden"
      type="file"
      placeholder="Recipe Image"
      id="fileInput"
      accept={acceptedImageMimeTypes.join(', ')}
      onChange={onUpload}
    />
  );
}
