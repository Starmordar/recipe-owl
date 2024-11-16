import { RefObject, useRef, useEffect, useState } from 'react';

interface UseVisualViewportChangeOptions {
  drawerRef: RefObject<HTMLElement>;
}

function useVisualViewportChange({ drawerRef }: UseVisualViewportChangeOptions) {
  const initialDrawerHeight = useRef(0);
  const previousDiffFromInitial = useRef(0);
  const keyboardIsOpen = useRef(false);

  const [state, setState] = useState({});

  useEffect(() => {
    if (!drawerRef.current) return;

    function onVisualViewportChange() {
      if (!drawerRef.current) return;

      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement instanceof HTMLInputElement || keyboardIsOpen.current) {
        const visualViewportHeight = window.visualViewport?.height || 0;
        const drawerTop = drawerRef.current.getBoundingClientRect().top || 0;
        // const drawerHeight = drawerRef.current.getBoundingClientRect().height || 0;

        drawerRef.current.style.height = `${visualViewportHeight - drawerTop}px`;

        // const diffFromInitial = window.innerHeight - visualViewportHeight;

        // if (!initialDrawerHeight.current) initialDrawerHeight.current = drawerHeight;

        // if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) {
        //   keyboardIsOpen.current = !keyboardIsOpen.current;
        // }

        // previousDiffFromInitial.current = diffFromInitial;

        // if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
        //   const height = drawerRef.current.getBoundingClientRect().height;
        //   drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
        // } else {
        //   drawerRef.current.style.height = `${initialDrawerHeight.current}px`;
        // }

        // drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`;

        // setState({
        //   visualViewportHeight,
        //   diffFromInitial,
        //   drawerHeight,
        //   keyboardIsOpen,
        //   currentHeight: drawerRef.current.getBoundingClientRect().height,
        // });
      }
    }

    window.visualViewport?.addEventListener('resize', onVisualViewportChange);
    return () => {
      window.visualViewport?.removeEventListener('resize', onVisualViewportChange);
    };
  }, [drawerRef]);

  return { state };
}

export { useVisualViewportChange };
