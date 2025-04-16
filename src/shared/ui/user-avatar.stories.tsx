import { UserAvatar } from './user-avatar';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserAvatar> = {
  title: 'Shared/user-avatar',
  component: UserAvatar,
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Primary: Story = {
  name: "I'm primary",
  args: {
    width: 60,
    height: 60,
    src: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frecipe-owl%2F1727799162500-licensed-image.jpeg&w=640&q=75',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    width: 80,
    height: 80,
  },
};
