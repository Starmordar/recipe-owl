import { useImperativeHandle, useRef, useLayoutEffect } from 'react';

interface UseAutoResizeTextareaOptions {
  ref: React.ForwardedRef<HTMLTextAreaElement>;
  autoResize?: boolean;
}

export function useAutoResizeTextarea({ ref, autoResize }: UseAutoResizeTextareaOptions) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

  useLayoutEffect(() => {
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
