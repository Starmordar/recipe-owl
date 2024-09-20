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
        <Button disabled={disabled} onClick={onRemove} {...buttonProps}>
          <Trash2 className='h-5 w-5' />
        </Button>
      )}
    </>
  );
}

export default IngredientFieldActions;
