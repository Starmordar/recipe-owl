'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

function getMinuteItems(t: ReturnType<typeof useTranslations>) {
  return Array.from({ length: 60 }, (_, index) => ({
    value: index,
    label: `${index} ${t('minuteLabel')}`,
  }));
}

function getHourItems(t: ReturnType<typeof useTranslations>) {
  return Array.from({ length: 24 }, (_, index) => ({
    value: index,
    label: `${index} ${t('hourLabel', { hours: index })}`,
  }));
}

interface WheelPickerProps {
  onChange: (field: 'hours' | 'minutes', value: number) => void;
  defaultValue: { hours: number; minutes: number };
  itemHeight?: number;
}

function WheelPicker({ defaultValue, itemHeight = 54, onChange }: WheelPickerProps) {
  const t = useTranslations('Common.TimePicker');

  const minuteItems = useRef<ReturnType<typeof getMinuteItems> | null>(null);
  if (minuteItems.current === null) minuteItems.current = getMinuteItems(t);
  const hourItems = useRef<ReturnType<typeof getHourItems> | null>(null);
  if (hourItems.current === null) hourItems.current = getHourItems(t);

  return (
    <div
      style={{ height: `${itemHeight * 3}px` }}
      className='relative flex justify-around text-lg overflow-hidden'
      data-vaul-no-drag={true}
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
        items={hourItems.current}
        itemHeight={itemHeight}
        onChange={value => onChange('hours', value)}
      />

      <ItemWheel
        defaultValue={defaultValue.minutes}
        items={minuteItems.current}
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
      const tolerance = 2; // 2 pixels to accommodate rounding on mobile

      const scrollHeight = (target as HTMLElement)?.scrollTop ?? 0;
      const exactItem = scrollHeight / itemHeight;

      const selectedItem =
        Math.abs(Math.round(exactItem) - exactItem) < tolerance
          ? Math.round(exactItem)
          : Math.floor(exactItem);

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
  );
}

export { WheelPicker };
