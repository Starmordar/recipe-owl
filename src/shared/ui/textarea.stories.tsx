import { userEvent, within, expect, fn, waitFor } from '@storybook/test';

import { Textarea } from './textarea';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Textarea> = {
  title: 'Shared/textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  args: {
    onInput: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    value: 'Small Input Value',
  },
};

export const MultiLineResize: Story = {
  args: {
    autoResize: true,
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};

export const MultiLineNoResize: Story = {
  args: {
    autoResize: false,
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};

export const DynamicResize: Story = {
  args: {
    defaultValue: 'Input ',
  },
  render: props => {
    return <Textarea {...props} autoResize />;
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const textarea = await waitFor(() => canvas.getByRole('textbox'));
    const initialHeight = textarea.offsetHeight;

    await userEvent.type(
      textarea,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. dw',
    );

    expect(args.onInput).toHaveBeenCalled();
    expect(initialHeight).not.toBe(textarea.offsetHeight);
  },
};
