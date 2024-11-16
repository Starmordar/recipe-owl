import { RefObject, useRef, useEffect } from 'react';

interface UseVisualViewportChangeOptions {
  drawerRef: RefObject<HTMLElement>;
}

function useVisualViewportChange({ drawerRef }: UseVisualViewportChangeOptions) {
  const initialDrawerHeight = useRef(0);
  const previousDiffFromInitial = useRef(0);
  const keyboardIsOpen = useRef(false);

  useEffect(() => {
    function onVisualViewportChange() {
      if (!drawerRef.current) return;

      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement instanceof HTMLInputElement || keyboardIsOpen.current) {
        const visualViewportHeight = window.visualViewport?.height || 0;
        const diffFromInitial = window.innerHeight - visualViewportHeight;
        const drawerHeight = drawerRef.current.getBoundingClientRect().height || 0;

        if (!initialDrawerHeight.current) initialDrawerHeight.current = drawerHeight;
        const offsetFromTop = drawerRef.current.getBoundingClientRect().top;

        if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) {
          keyboardIsOpen.current = !keyboardIsOpen.current;
        }

        previousDiffFromInitial.current = diffFromInitial;

        if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
          const height = drawerRef.current.getBoundingClientRect().height;
          drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
        } else {
          drawerRef.current.style.height = `${initialDrawerHeight.current}px`;
        }

        drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`;
      }
    }

    window.visualViewport?.addEventListener('resize', onVisualViewportChange);
    return () => {
      window.visualViewport?.removeEventListener('resize', onVisualViewportChange);
    };
  }, [drawerRef]);
}

export { useVisualViewportChange };
