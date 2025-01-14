'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@/src/shared/lib/classnames';
import { Button } from '@/src/shared/ui/button';
import { Input, type InputProps } from '@/src/shared/ui/input';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const t = useTranslations('Common.PasswordInput');
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled = props.value === '' || props.value === undefined || props.disabled;

    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10', className)}
          ref={ref}
          {...props}
        />

        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
          onClick={() => setShowPassword(prev => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className='h-4 w-4' aria-hidden='true' />
          ) : (
            <EyeOffIcon className='h-4 w-4' aria-hidden='true' />
          )}
          <span className='sr-only'>
            {showPassword ? t('toggleHidePassword') : t('toggleShowPassword')}
          </span>
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
