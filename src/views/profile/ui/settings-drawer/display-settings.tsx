'use client';

import { useTheme } from 'next-themes';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/src/shared/ui/accordion';
import { Label } from '@/src/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/shared/ui/radio-group';

function DisplaySettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Accordion type='multiple'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Display</AccordionTrigger>

        <AccordionContent>
          <RadioGroup defaultValue={theme} onValueChange={setTheme}>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='system' id='system' />
              <Label htmlFor='system'>Use System Default</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='light' id='light' />
              <Label htmlFor='light'>Light</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='dark' id='dark' />
              <Label htmlFor='dark'>Dark</Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export { DisplaySettings };
