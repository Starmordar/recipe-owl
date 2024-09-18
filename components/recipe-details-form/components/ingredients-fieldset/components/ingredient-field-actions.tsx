'use client';

import { GripVertical, Trash2 } from 'lucide-react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { Button, ButtonProps } from '@/components/ui/button';

interface IngredientFieldActionsProps {
  onRemove: () => void;
  disabled: boolean;

  isDraggable: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function IngredientFieldActions({
  onRemove,
  disabled,
  isDraggable,
  dragHandleProps,
}: IngredientFieldActionsProps) {
  const buttonProps = {
    className: 'rounded-full',
    variant: 'ghost',
    size: 'icon',
    type: 'button',
  } as ButtonProps;

  return (
    <>
      {isDraggable ? (
        <Button {...buttonProps} {...dragHandleProps}>
          <GripVertical className='h-4 w-4 opacity-50' />
        </Button>
      ) : (
        <Button disabled={disabled} onClick={onRemove} {...buttonProps}>
          <Trash2 className='h-4 w-4 opacity-50' />
        </Button>
      )}
    </>
  );
}

export default IngredientFieldActions;
