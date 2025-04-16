import { userEvent, within, expect } from '@storybook/test';

import { ReadMoreText } from './read-more-text';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ReadMoreText> = {
  title: 'Shared/read-more-text',
  component: ReadMoreText,
  args: {
    className: 'text-base leading-2 break-words',
  },
  argTypes: {
    className: {
      control: 'inline-radio',
      options: ['regular', 'large'],
      mapping: {
        regular: 'text-base leading-2 break-words',
        large: 'text-2xl leading-1 break-words',
      },
    },
  },
  decorators: [
    (Story, { args }) => {
      return (
        <div className='w-52'>
          <Story />
        </div>
      );
    },
  ],
  tags: ['common'],
};

export default meta;
type Story = StoryObj<typeof ReadMoreText>;

export const NoOverflow: Story = {
  args: {
    className: 'regular',
    children: 'Lorem ipsum dolor sit amet',
  },
};

export const Overflow: Story = {
  args: {
    className: 'regular',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};

export const OverflowWithPlay: Story = {
  args: {
    ...Overflow.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
    await userEvent.click(canvas.getByRole('button'), { delay: 100 });

    expect(canvas.getByRole('button')).toBeInTheDocument();
  },
};
