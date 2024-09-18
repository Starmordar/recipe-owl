'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import StrictModeDroppable from '@/components/react-beautiful-dnd/strict-mode-droppable';
import { Button } from '@/components/ui/button';

import IngredientField from './components/ingredient-field';
import IngredientFieldActions from './components/ingredient-field-actions';
import SectionLegend from './components/section-legend';

import type { FormValues } from '../../constants/shema';

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
    if (fields.length < 2) return;
    remove(index);
  }

  function handleDragField({ source, destination }: DropResult) {
    if (destination) move(source.index, destination.index);
  }

  return (
    <fieldset className='flex flex-col'>
      <SectionLegend isDraggable={isDraggable} setIsDraggable={setIsDraggable} />

      <DragDropContext onDragEnd={handleDragField}>
        <ul>
          <StrictModeDroppable droppableId='ingredients'>
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='flex flex-col gap-y-4'
              >
                {fields.map((field, index) => {
                  return (
                    <Draggable
                      key={`ingredients-${index}`}
                      draggableId={`ingredients-${index}`}
                      index={index}
                      isDragDisabled={!isDraggable}
                    >
                      {provided => (
                        <li
                          key={field.id}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className='flex'
                        >
                          <IngredientField form={form} field={field} index={index} />

                          <IngredientFieldActions
                            isDraggable={isDraggable}
                            dragHandleProps={provided.dragHandleProps}
                            disabled={fields.length < 2}
                            onRemove={() => handleRemoveField(index)}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </ul>
      </DragDropContext>

      <div className='flex justify-center mt-4'>
        <Button variant='ghost' type='button' onClick={() => append({ name: '', unit: '' })}>
          <Plus className='h-5 w-5 opacity-80 mr-2' />
          Ingredient
        </Button>
      </div>
    </fieldset>
  );
}

export default IngredientsFieldset;
