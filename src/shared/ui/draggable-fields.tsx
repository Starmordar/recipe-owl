'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cloneElement, type PropsWithChildren, type ReactNode, type JSX } from 'react';

import { cn } from '@/src/shared/lib/classnames';
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
  className?: string;

  onDragField: (result: DropResult) => void;
  renderField: (props: FieldProps<Field>) => ReactNode;
  renderAction: (props: FieldActionProps) => ReactNode;
}

function DraggableFields<Field extends FieldArrayWithId>({
  fields,
  isDraggable,
  droppableId,
  draggableId,
  className,
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
              className={cn('flex flex-col gap-y-4', className)}
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
                        className='flex items-start gap-2'
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
    <div className='flex items-baseline justify-between gap-x-4'>
      <legend className='text-xl font-bold lg:text-2xl'>{title}</legend>

      <button
        className='shrink-0 -my-2 py-2 text-sm font-medium text-primary'
        type='button'
        onClick={() => setIsDraggable(!isDraggable)}
      >
        {isDraggable ? t('actionDone') : t('actionReorder')}
      </button>
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
    className: 'mt-1.5 shrink-0 rounded-full text-muted-foreground',
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
