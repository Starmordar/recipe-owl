import { RefObject, useEffect } from 'react';

interface UseVisualViewportChangeOptions {
  drawerRef: RefObject<HTMLElement>;
}

function useVisualViewportChange({ drawerRef }: UseVisualViewportChangeOptions) {
  useEffect(() => {
    if (!drawerRef.current) return;

    function onVisualViewportChange() {
      if (!drawerRef.current) return;

      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement instanceof HTMLInputElement) {
        const visualViewportHeight = window.visualViewport?.height || 0;
        const drawerTop = drawerRef.current.getBoundingClientRect().top || 0;

        drawerRef.current.style.height = `${visualViewportHeight - drawerTop}px`;
      }
    }

    window.visualViewport?.addEventListener('resize', onVisualViewportChange);
    return () => {
      window.visualViewport?.removeEventListener('resize', onVisualViewportChange);
    };
  }, [drawerRef]);
}

export { useVisualViewportChange };
