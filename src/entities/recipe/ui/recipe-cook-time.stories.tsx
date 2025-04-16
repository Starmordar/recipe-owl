import { RecipeCookTime } from './recipe-cook-time';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Entities/Recipe/recipe-cook-time',
  component: RecipeCookTime,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RecipeCookTime>;

export default meta;
type Story = StoryObj<typeof RecipeCookTime>;

export const Default: Story = {
  args: {
    cookTime: '12 hr 45 min',
  },
};

export const OnlyHours: Story = {
  args: {
    cookTime: '10 hr',
  },
};

export const OnlyMinutes: Story = {
  args: {
    cookTime: '45 min',
  },
};
