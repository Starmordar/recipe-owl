'use client';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/src/shared/ui/accordion';
import { Label } from '@/src/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/src/shared/ui/radio-group';

function LanguageSettings() {
  return (
    <AccordionItem value='language'>
      <AccordionTrigger>Language</AccordionTrigger>

      <AccordionContent>
        <RadioGroup defaultValue='english'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='english' id='english' />
            <Label htmlFor='english'>English</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='russian' id='russian' />
            <Label htmlFor='russian'>Russian</Label>
          </div>
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  );
}

export { LanguageSettings };
