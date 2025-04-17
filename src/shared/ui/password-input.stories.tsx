import { userEvent, within, expect, fn, waitFor } from '@storybook/test';

import { PasswordInput } from './password-input';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PasswordInput> = {
  title: 'Shared/password-input',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    value: 'Input Value',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const eyeButton = canvas.getByRole('button');
    const input = canvas.getByLabelText('password-input');

    expect(input).toHaveAttribute('type', 'password');
    await userEvent.click(eyeButton);

    expect(input).toHaveAttribute('type', 'text');
  },
};

export const EmptyValue: Story = {
  args: {
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const eyeButton = canvas.getByRole('button');
    expect(eyeButton).toBeDisabled();
  },
};
