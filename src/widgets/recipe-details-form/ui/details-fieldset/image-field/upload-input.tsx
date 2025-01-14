import { forwardRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { acceptedImageMimeTypes } from '@/src/shared/config/image';
import { Input } from '@/src/shared/ui/input';

interface UploadInputProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
  id: string;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fieldProps: Partial<ControllerRenderProps>;
  capture?: 'user' | 'environment';
}

const UploadInput = forwardRef<HTMLInputElement, UploadInputProps>(
  ({ id, onUpload, fieldProps, ...inputProps }, ref) => (
    <Input
      id={id}
      {...fieldProps}
      className='hidden'
      type='file'
      placeholder=''
      accept={acceptedImageMimeTypes.join(', ')}
      onChange={onUpload}
      ref={ref}
      {...inputProps}
    />
  ),
);
UploadInput.displayName = 'UploadInput';

export type { UploadInputProps };
export { UploadInput };
