import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { UploadInput } from './upload-input';

interface FileUploadHandles {
  onUpload: () => void;
  onTakePhoto: () => void;
}

interface FileInputsProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fieldProps: Partial<ControllerRenderProps>;
}

const FileInputs = forwardRef<FileUploadHandles, FileInputsProps>(
  ({ onUpload, fieldProps }: FileInputsProps, ref) => {
    const uploadFileInputRef = useRef<HTMLInputElement>(null);
    const takePhotoInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return {
        onUpload() {
          uploadFileInputRef.current?.click();
        },
        onTakePhoto() {
          takePhotoInputRef.current?.click();
        },
      };
    });

    return (
      <>
        <UploadInput
          id='upload-file-input'
          onUpload={onUpload}
          fieldProps={fieldProps}
          ref={uploadFileInputRef}
        />

        <UploadInput
          id='take-photo-input'
          capture='environment'
          onUpload={onUpload}
          fieldProps={fieldProps}
          ref={takePhotoInputRef}
        />
      </>
    );
  },
);
FileInputs.displayName = 'FileInputs';

export type { FileUploadHandles };
export { FileInputs };
