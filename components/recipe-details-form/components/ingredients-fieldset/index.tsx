'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import {
  DraggableAction,
  DraggableFields,
  DraggableFieldsHeader,
} from '@/shared/ui/draggable-fields';

import IngredientField from './components/ingredient-field';

import type { FormValues } from '../../constants/shema';
import type { DropResult } from '@hello-pangea/dnd';

interface IngredientsFieldsetProps {
  form: UseFormReturn<FormValues>;
}

function IngredientsFieldset({ form }: IngredientsFieldsetProps) {
  const [isDraggable, setIsDraggable] = useState(false);

  const { fields, append, move, remove } = useFieldArray({
    name: 'ingredients',
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
        title='Ingredients'
        isDraggable={isDraggable}
        setIsDraggable={setIsDraggable}
      />

      <DraggableFields<(typeof fields)[number]>
        fields={fields}
        droppableId='ingredients'
        draggableId='ingredients'
        isDraggable={isDraggable}
        onDragField={handleDragField}
        renderField={({ field, index }) => (
          <IngredientField form={form} field={field} index={index} />
        )}
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

      <div className='flex justify-center mt-4'>
        <Button variant='ghost' type='button' onClick={() => append({ name: '', unit: '' })}>
          <Plus className='h-5 w-5 mr-2' />
          Ingredient
        </Button>
      </div>
    </fieldset>
  );
}

export default IngredientsFieldset;
