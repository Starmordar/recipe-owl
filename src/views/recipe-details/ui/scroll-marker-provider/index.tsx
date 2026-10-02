'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { cn } from '@/src/shared/lib/classnames';

import type { PropsWithChildren } from 'react';

// Height of the page header (h-14): a marker is passed once it is scrolled behind it.
const headerHeight = 56;

type MarkerName = 'photo' | 'title';

interface ScrollMarkerContextType {
  passedMarkers: Record<MarkerName, boolean>;
  setMarkerPassed: (name: MarkerName, isPassed: boolean) => void;
}

const ScrollMarkerContext = createContext<ScrollMarkerContextType>({} as ScrollMarkerContextType);

function ScrollMarkerProvider({ children }: PropsWithChildren) {
  const [passedMarkers, setPassedMarkers] = useState({ photo: false, title: false });

  const setMarkerPassed = useCallback((name: MarkerName, isPassed: boolean) => {
    setPassedMarkers(markers => ({ ...markers, [name]: isPassed }));
  }, []);

  return (
    <ScrollMarkerContext.Provider value={{ passedMarkers, setMarkerPassed }}>
      {children}
    </ScrollMarkerContext.Provider>
  );
}

function useIsScrolledPast(name: MarkerName) {
  return useContext(ScrollMarkerContext).passedMarkers[name];
}

interface ScrollMarkerProps {
  name: MarkerName;
  className?: string;
}

// An invisible point on the page, positioned by `className` inside a relative parent.
function ScrollMarker({ name, className }: ScrollMarkerProps) {
  const { setMarkerPassed } = useContext(ScrollMarkerContext);
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!markerRef.current) return;

    function onIntersectionChange([entry]: Array<IntersectionObserverEntry>) {
      setMarkerPassed(name, !entry.isIntersecting && entry.boundingClientRect.top < headerHeight);
    }

    const observer = new IntersectionObserver(onIntersectionChange, {
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
    });
    observer.observe(markerRef.current);

    return () => observer.disconnect();
  }, [name, setMarkerPassed]);

  return (
    <span ref={markerRef} className={cn('absolute h-px w-px', className)} aria-hidden='true' />
  );
}

export { ScrollMarkerProvider, ScrollMarker, useIsScrolledPast };
