'use client';

import { useEffect, useRef } from 'react';

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

function WheelPicker({ defaultValue, itemHeight = 44, onChange }: WheelPickerProps) {
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

  useEffect(() => {
    if (!containerRef.current) return;
    const ref = containerRef.current;

    function handleScroll({ target }: Event) {
      const scrollHeight = (target as HTMLElement)?.scrollTop ?? 0;
      const selectedItem = Math.floor(scrollHeight / itemHeight);

      onChange(selectedItem);
    }

    console.log('new trigger');
    ref.scrollTo({ top: defaultValue * itemHeight });
    ref.addEventListener('scroll', handleScroll);
    return () => {
      ref.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ul
      ref={containerRef}
      className='grow text-center overflow-y-scroll hide-scrollbar snap-y snap-mandatory'
    >
      <li className='h-[2.75rem] snap-center'></li>
      {items.map(item => (
        <li key={item.value} className='py-2 snap-center'>
          {item.label}
        </li>
      ))}
      <li className='h-[2.75rem] snap-center'></li>
    </ul>
  );
}

export { WheelPicker };
