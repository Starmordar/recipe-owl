import { userEvent, within, expect, fn, waitFor } from '@storybook/test';

import { NumberInputSpinner } from './number-input-spinner';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NumberInputSpinner> = {
  title: 'Shared/number-input-spinner',
  component: NumberInputSpinner,
  parameters: {
    layout: 'centered',
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof NumberInputSpinner>;

export const Default: Story = {
  args: {
    value: 12,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('decrease-action'));
    await userEvent.click(canvas.getByTestId('increase-action'));

    await waitFor(() => expect(args.onValueChange).toHaveBeenCalledTimes(2));
  },
};

export const MinValue: Story = {
  args: {
    value: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('decrease-action')).toBeDisabled();
    expect(canvas.getByTestId('increase-action')).toBeEnabled();
  },
};
