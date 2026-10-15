'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button } from '@/src/shared/ui/button';
import {
  DraggableAction,
  DraggableFields,
  DraggableFieldsHeader,
} from '@/src/shared/ui/draggable-fields';

import { StepField } from './step-field';

import type { FormValues } from '../../model/schema';
import type { DropResult } from '@hello-pangea/dnd';

interface StepsFieldsetProps {
  form: UseFormReturn<FormValues>;
}

function StepsFieldset({ form }: StepsFieldsetProps) {
  const t = useTranslations('RecipeFormPage.Form.Fields');
  const [isDraggable, setIsDraggable] = useState(false);

  const { fields, append, move, remove } = useFieldArray({
    name: 'steps',
    control: form.control,
  });

  function handleRemoveField(index: number) {
    if (fields.length > 1) remove(index);
  }

  function handleDragField({ source, destination }: DropResult) {
    if (destination) move(source.index, destination.index);
  }

  return (
    <fieldset className='flex flex-col gap-y-3'>
      <DraggableFieldsHeader
        title={t('stepsTitle')}
        isDraggable={isDraggable}
        setIsDraggable={setIsDraggable}
      />

      <DraggableFields<(typeof fields)[number]>
        fields={fields}
        droppableId='steps'
        draggableId='steps'
        isDraggable={isDraggable}
        className='gap-y-2.5'
        onDragField={handleDragField}
        renderField={({ field, index }) => <StepField form={form} field={field} index={index} />}
        renderAction={({ dragHandleProps, index }) => (
          <DraggableAction
            isDraggable={isDraggable}
            dragHandleProps={dragHandleProps}
            disabled={fields.length < 2}
            onAction={() => handleRemoveField(index)}
            Icon={<Trash2 />}
          />
        )}
      />

      <Button
        className='w-full gap-x-2 border-dashed border-muted-foreground/40 text-base text-muted-foreground'
        variant='outline'
        type='button'
        onClick={() => append({ description: '' })}
      >
        <Plus className='h-5 w-5' aria-hidden='true' />
        {t('addStepAction')}
      </Button>
    </fieldset>
  );
}

export { StepsFieldset };
