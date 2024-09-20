'use client';

import { CheckCheck, GripVertical, Shuffle } from 'lucide-react';
import { cloneElement, type PropsWithChildren, type ReactNode } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import StrictModeDroppable from '@/components/react-beautiful-dnd/strict-mode-droppable';
import { Button, ButtonProps } from '@/components/ui/button';

import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import type { FieldArrayWithId } from 'react-hook-form';

export interface FieldProps<Field extends FieldArrayWithId> {
  field: Field;
  index: number;
}

export interface FieldActionProps {
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  index: number;
}

interface DraggableFieldsProps<Field extends FieldArrayWithId> {
  fields: Array<Field>;
  isDraggable: boolean;
  droppableId: string;
  draggableId: string;

  onDragField: (result: DropResult) => void;
  renderField: (props: FieldProps<Field>) => ReactNode;
  renderAction: (props: FieldActionProps) => ReactNode;
}

function DraggableFields<Field extends FieldArrayWithId>({
  fields,
  isDraggable,
  droppableId,
  draggableId,
  onDragField,
  renderField,
  renderAction,
}: DraggableFieldsProps<Field>) {
  return (
    <DragDropContext onDragEnd={onDragField}>
      <ul>
        <StrictModeDroppable droppableId={droppableId}>
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-col gap-y-4'
            >
              {fields.map((field, index) => {
                return (
                  <Draggable
                    key={`${draggableId}-${index}`}
                    draggableId={`${draggableId}-${index}`}
                    index={index}
                    isDragDisabled={!isDraggable}
                  >
                    {provided => (
                      <li
                        key={field.id}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className='flex items-center gap-2'
                      >
                        {renderField({ field, index })}
                        {renderAction({ dragHandleProps: provided.dragHandleProps, index })}
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
  );
}

interface DraggableFieldsHeader extends PropsWithChildren {
  title: string;
  isDraggable: boolean;
  setIsDraggable: (value: boolean) => void;
}

function DraggableFieldsHeader({ title, isDraggable, setIsDraggable }: DraggableFieldsHeader) {
  return (
    <div className='flex justify-between'>
      <legend className='text-lg font-medium'>{title}</legend>

      <Button
        className='gap-x-2'
        size='xss'
        variant='outline'
        type='button'
        onClick={() => setIsDraggable(!isDraggable)}
      >
        {isDraggable ? (
          <>
            Done <CheckCheck className='h-4 w-4' />
          </>
        ) : (
          <>
            Reorder <Shuffle className='h-4 w-4' />
          </>
        )}
      </Button>
    </div>
  );
}

interface DraggableActionProps {
  isDraggable: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  disabled: boolean;

  Icon: JSX.Element;
  onAction: () => void;
}

function DraggableAction({
  onAction,
  disabled,
  isDraggable,
  dragHandleProps,
  Icon,
}: DraggableActionProps) {
  const buttonProps = {
    className: 'rounded-full',
    variant: 'ghost',
    size: 'icon-xs',
    type: 'button',
  } as ButtonProps;

  return (
    <>
      {isDraggable ? (
        <Button {...buttonProps} {...dragHandleProps}>
          <GripVertical className='h-5 w-5' />
        </Button>
      ) : (
        <Button disabled={disabled} onClick={onAction} {...buttonProps}>
          {cloneElement(Icon, { className: 'h-5 w-5' })}
        </Button>
      )}
    </>
  );
}

export { DraggableFields, DraggableFieldsHeader, DraggableAction };
