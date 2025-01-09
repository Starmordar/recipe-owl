'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { CheckCheck, GripVertical, Shuffle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cloneElement, type PropsWithChildren, type ReactNode } from 'react';

import { Button, ButtonProps } from '@/src/shared/ui/button';

import type { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
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
        <Droppable droppableId={droppableId}>
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
        </Droppable>
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
  const t = useTranslations('Common.DraggableFields');

  return (
    <div className='flex justify-between'>
      <legend className='text-lg font-semibold'>{title}</legend>

      <Button
        className='gap-x-2 text-base'
        size='xs'
        variant='outline'
        type='button'
        onClick={() => setIsDraggable(!isDraggable)}
      >
        {isDraggable ? (
          <>
            {t('actionDone')} <CheckCheck className='h-5 w-5' />
          </>
        ) : (
          <>
            {t('actionReorder')} <Shuffle className='h-5 w-5' />
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
          <GripVertical className='h-6 w-6' />
        </Button>
      ) : (
        <Button disabled={disabled} onClick={onAction} {...buttonProps}>
          {cloneElement(Icon, { className: 'h-6 w-6' })}
        </Button>
      )}
    </>
  );
}

export { DraggableFields, DraggableFieldsHeader, DraggableAction };
