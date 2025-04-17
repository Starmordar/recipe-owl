import { within, expect, fn } from '@storybook/test';
import { ComponentProps, useState } from 'react';

import { WheelPicker } from './wheel-picker';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WheelPicker> = {
  title: 'Shared/wheel-picker',
  component: WheelPicker,
  parameters: {
    layout: 'centered',
  },
  decorators: Story => (
    <div className='w-72'>
      <Story />
    </div>
  ),
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof WheelPicker>;

const ComponentWithState = ({ onChange }: ComponentProps<typeof WheelPicker>) => {
  const [timeString, setTimeString] = useState({ hours: 1, minutes: 45 });

  function onChangeCookTime(field: 'hours' | 'minutes', nextValue: number) {
    setTimeString(state => ({
      hours: field === 'hours' ? nextValue : state.hours,
      minutes: field === 'minutes' ? nextValue : state.minutes,
    }));

    onChange(field, nextValue);
  }

  return <WheelPicker onChange={onChangeCookTime} defaultValue={timeString} />;
};

export const Default: Story = {
  render: args => <ComponentWithState {...args} />,
  play: async ({ canvasElement, args }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args.onChange as any).mockClear();

    const canvas = within(canvasElement);
    const itemHeight = args.itemHeight ?? 54;

    const hoursList = canvas.getByTestId('hours-list');
    hoursList.scrollTop = itemHeight * 4;
    hoursList.dispatchEvent(new Event('scroll'));
    expect(args.onChange).toHaveBeenCalledWith('hours', 4);

    const minutesList = canvas.getByTestId('minutes-list');
    minutesList.scrollTop = itemHeight * 15;
    minutesList.dispatchEvent(new Event('scroll'));
    expect(args.onChange).toHaveBeenCalledWith('minutes', 15);
  },
};

export const BorderValues: Story = {
  render: args => <ComponentWithState {...args} />,
  play: async ({ canvasElement, args }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (args.onChange as any).mockClear();

    const canvas = within(canvasElement);
    const itemHeight = args.itemHeight ?? 54;

    const hoursList = canvas.getByTestId('hours-list');
    hoursList.scrollTop = itemHeight * -1;
    hoursList.dispatchEvent(new Event('scroll'));
    expect(args.onChange).toHaveBeenCalledWith('hours', 0);

    hoursList.scrollTop = itemHeight * 100;
    hoursList.dispatchEvent(new Event('scroll'));
    expect(args.onChange).toHaveBeenCalledWith('hours', 23);

    const minutesList = canvas.getByTestId('minutes-list');
    minutesList.scrollTop = itemHeight * -1;
    minutesList.dispatchEvent(new Event('scroll'));
    expect(args.onChange).toHaveBeenCalledWith('minutes', 0);

    minutesList.scrollTop = itemHeight * 100;
    minutesList.dispatchEvent(new Event('scroll'));
    expect(args.onChange).toHaveBeenCalledWith('minutes', 59);
  },
};
