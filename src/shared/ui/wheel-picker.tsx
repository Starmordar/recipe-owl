'use client';

import { useEffect, useRef, useState } from 'react';

const minuteItems = Array.from({ length: 60 }, (_, index) => ({
  value: index,
  label: `${index} min`,
}));

const hourItems = Array.from({ length: 24 }, (_, index) => ({
  value: index,
  label: `${index} ${index === 1 ? 'hour' : 'hours'}`,
}));

interface WheelPickerProps {
  onChange: (field: 'hours' | 'minutes', value: number) => void;
  defaultValue: { hours: number; minutes: number };
  itemHeight?: number;
}

function WheelPicker({ defaultValue, itemHeight = 54, onChange }: WheelPickerProps) {
  return (
    <div
      style={{ height: `${itemHeight * 3}px` }}
      className='relative flex justify-around text-lg overflow-hidden'
    >
      <div
        style={{ height: `${itemHeight}px` }}
        className='absolute top-1/2 -translate-y-1/2 inset-x-0 flex flex-col justify-between pointer-events-none'
      >
        <div className='w-full border-t'></div>
        <div className='w-full border-t'></div>
      </div>

      <div className='absolute inset-0 bg-fade-vertically pointer-events-none'></div>

      <ItemWheel
        defaultValue={defaultValue.hours}
        items={hourItems}
        itemHeight={itemHeight}
        onChange={value => onChange('hours', value)}
      />

      <ItemWheel
        defaultValue={defaultValue.minutes}
        items={minuteItems}
        itemHeight={itemHeight}
        onChange={value => onChange('minutes', value)}
      />
    </div>
  );
}

interface ItemWheelProps {
  items: Array<{ value: number; label: string }>;
  defaultValue: number;
  itemHeight: number;
  onChange: (value: number) => void;
}

function ItemWheel({ items, defaultValue, itemHeight, onChange }: ItemWheelProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<unknown>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ref = containerRef.current;

    function handleScroll({ target }: Event) {
      const tolerance = 2; // 2 pixels to accommodate rounding on mobile

      const scrollHeight = (target as HTMLElement)?.scrollTop ?? 0;
      const exactItem = scrollHeight / itemHeight;

      const selectedItem =
        Math.abs(Math.round(exactItem) - exactItem) < tolerance
          ? Math.round(exactItem)
          : Math.floor(exactItem);

      setState({ scrollHeight, exactItem, selectedItem });
      onChange(selectedItem);
    }

    ref.addEventListener('scroll', handleScroll);
    ref.scrollTo({ top: defaultValue * itemHeight });

    return () => {
      ref.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='absolute w-32 break-words insety-0 pointer-events-none'>
        {JSON.stringify(state)}
      </div>
      <ul
        ref={containerRef}
        className='grow text-center overflow-y-scroll hide-scrollbar snap-y snap-mandatory'
      >
        <li style={{ height: `${itemHeight}px` }} className='snap-center'></li>
        {items.map(item => (
          <li key={item.value} style={{ height: `${itemHeight}px` }} className='py-3 snap-center'>
            {item.label}
          </li>
        ))}
        <li style={{ height: `${itemHeight}px` }} className='snap-center'></li>
      </ul>
    </>
  );
}

export { WheelPicker };
