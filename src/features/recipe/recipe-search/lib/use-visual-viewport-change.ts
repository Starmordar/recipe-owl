import { RefObject, useRef, useEffect } from 'react';

interface UseVisualViewportChangeOptions {
  containerRef: RefObject<HTMLElement>;
}

function useVisualViewportChange({ containerRef }: UseVisualViewportChangeOptions) {
  const initialContainerHeight = useRef(0);
  const previousDiffFromInitial = useRef(0);
  const keyboardIsOpen = useRef(false);

  useEffect(() => {
    function onVisualViewportChange() {
      if (!containerRef.current) return;

      const focusedElement = document.activeElement as HTMLElement;
      if (!(focusedElement instanceof HTMLInputElement) && !keyboardIsOpen.current) return;

      const visualViewportHeight = window.visualViewport?.height || 0;
      const keyboardHeight = window.innerHeight - visualViewportHeight;

      const containerHeight = containerRef.current.getBoundingClientRect().height || 0;
      if (!initialContainerHeight.current) initialContainerHeight.current = containerHeight;

      if (Math.abs(previousDiffFromInitial.current - keyboardHeight) > 60) {
        keyboardIsOpen.current = !keyboardIsOpen.current;
      }

      previousDiffFromInitial.current = keyboardHeight;

      if (containerHeight > visualViewportHeight || keyboardIsOpen.current) {
        const height = containerRef.current.getBoundingClientRect().height;
        containerRef.current.style.height = `${height - Math.max(keyboardHeight, 0)}px`;
      } else {
        containerRef.current.style.height = `${initialContainerHeight.current}px`;
      }

      containerRef.current.style.bottom = `${Math.max(keyboardHeight, 0)}px`;
    }

    window.visualViewport?.addEventListener('resize', onVisualViewportChange);
    return () => {
      window.visualViewport?.removeEventListener('resize', onVisualViewportChange);
    };
  }, [containerRef]);
}

export { useVisualViewportChange };
