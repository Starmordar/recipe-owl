import { userEvent, waitFor, expect, within, fireEvent } from '@storybook/test';
import { LazyMotion } from 'framer-motion';

import SwipableTabs from './swipable-tabs';

import type { Meta, StoryObj } from '@storybook/react';

const tabs = {
  tab_1: {
    title: 'Tab1',
    content: <p>Tab1 Content</p>,
  },
  tab_2: {
    title: 'Tab2',
    content: <p>Tab2 Content</p>,
  },
};

const meta: Meta<typeof SwipableTabs> = {
  title: 'Shared/swipable-tabs',
  component: SwipableTabs,
  parameters: {
    layout: 'centered',
  },
  decorators: Story => {
    const loadAnimationFeatures = () =>
      import('@/src/shared/lib/framer-motion/dom-max').then(res => res.default);

    return (
      <LazyMotion features={loadAnimationFeatures} strict>
        <div className='flex w-[30vw] h-[60vh]'>
          <Story />
        </div>
      </LazyMotion>
    );
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof SwipableTabs>;

export const Default: Story = {
  args: {
    defaultTab: 'tab_1',
    tabs: tabs,
  },
};

export const TabSwitch: Story = {
  args: { ...Default.args },
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Tab2'), { delay: 10 });
    await waitFor(() =>
      expect(canvas.getByText('Tab2 Content').parentElement).toHaveStyle('transform: none'),
    );

    await userEvent.click(canvas.getByText('Tab1'), { delay: 10 });
    await waitFor(() =>
      expect(canvas.getByText('Tab1 Content').parentElement).toHaveStyle('transform: none'),
    );
  },
};
