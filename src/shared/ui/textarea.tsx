import * as React from 'react';

import { cn } from '@/src/shared/lib/classnames';

interface UseAutoResizeTextareaOptions {
  ref: React.ForwardedRef<HTMLTextAreaElement>;
  autoResize?: boolean;
}

function useAutoResizeTextarea({ ref, autoResize }: UseAutoResizeTextareaOptions) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

  React.useLayoutEffect(() => {
    const ref = textAreaRef?.current;

    function updateTextareaHeight() {
      if (!ref || !autoResize) return;

      ref.style.height = 'auto';
      ref.style.height = ref?.scrollHeight + 'px';
    }

    updateTextareaHeight();
    ref?.addEventListener('input', updateTextareaHeight);

    return () => ref?.removeEventListener('input', updateTextareaHeight);
  }, [textAreaRef, autoResize]);

  return { textAreaRef };
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize, ...props }, ref) => {
    const { textAreaRef } = useAutoResizeTextarea({ ref, autoResize });

    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background overflow-y-hidden placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={textAreaRef}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
