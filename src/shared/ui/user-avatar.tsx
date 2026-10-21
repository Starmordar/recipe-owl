'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

import { cn } from '@/src/shared/lib/classnames';

interface UserAvatarProps {
  className?: string;
  fallbackClassName?: string;
  width?: number;
  height?: number;
  src?: string | null;
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(({ className, ...props }, ref) => (
  <div ref={ref}>
    {props.src ? (
      <Image
        className='aspect-square rounded-full object-cover'
        height={props.height ?? 28}
        width={props.width ?? 28}
        src={props.src}
        alt=''
      />
    ) : (
      <div className={cn('h-6 w-6 rounded-full bg-primary', props.fallbackClassName)}></div>
    )}
  </div>
));
UserAvatar.displayName = 'UserAvatar';
export { UserAvatar };
