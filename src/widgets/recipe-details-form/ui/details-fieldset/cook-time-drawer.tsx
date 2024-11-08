'use client';

import { useState, type PropsWithChildren } from 'react';

import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui/drawer';
import { WheelPicker } from '@/src/shared/ui/wheel-picker';

interface CookTimeDrawerProps extends PropsWithChildren {
  value: string;
  onChange: (value: string) => void;
}

function parseHoursAndMinutes(time: string) {
  const parts = time?.split(' ') ?? [];
  if (parts.length !== 4) return { hours: 1, minutes: 15 };

  const [hours, , minutes] = parts;
  return { hours: parseInt(hours), minutes: parseInt(minutes) };
}

function CookTimeDrawer({ value, onChange, children }: CookTimeDrawerProps) {
  const [timeString, setTimeString] = useState(parseHoursAndMinutes(value));

  function onChangeCookTime(field: 'hour' | 'min', fieldValue: number) {
    setTimeString(value => ({
      hours: field === 'hour' ? fieldValue : value.hours,
      minutes: field === 'min' ? fieldValue : value.minutes,
    }));
  }

  function handleSetCookTime({ reset }: { reset?: boolean }) {
    if (reset) onChange('');
    onChange(`${timeString.hours} hr ${timeString.minutes} mins`);
  }

  return (
    <Drawer>
      <DrawerTrigger className='w-full'>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cook Time</DrawerTitle>
          <DrawerDescription>How long does it take to cook this recipe?</DrawerDescription>
        </DrawerHeader>

        <WheelPicker onChange={onChangeCookTime} />

        <DrawerFooter className='flex flex-row w-full'>
          <DrawerClose className='flex-1' asChild>
            <Button
              className='w-full'
              variant='outline'
              onClick={() => handleSetCookTime({ reset: true })}
            >
              Clear
            </Button>
          </DrawerClose>

          <DrawerClose className='flex-1' asChild>
            <Button className='w-full' onClick={() => handleSetCookTime({})}>
              Save
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { CookTimeDrawer };
