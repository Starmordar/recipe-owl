import { RecipeCard } from './recipe-card';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Entities/Recipe/recipe-card',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
  },
  decorators: Story => (
    <div className='w-44'>
      <Story />
    </div>
  ),
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof RecipeCard>;

const recipeMock = {
  id: 1234,
  title: 'Rice and Beans',
  tags: ['Chill'],
  imageUrl: 'https://storage.googleapis.com/recipe-owl/1726322613497-1000006263.jpeg',
  cookTime: '1 hr 45 min',
};

export const Default: Story = {
  args: {
    recipe: recipeMock,
  },
};

export const WithoutTags: Story = {
  args: {
    recipe: { ...recipeMock, tags: [] },
  },
};

export const WithoutTime: Story = {
  args: {
    recipe: { ...recipeMock, cookTime: null },
  },
};

export const WithoutTimeAndTags: Story = {
  args: {
    recipe: { ...recipeMock, tags: [], cookTime: null },
  },
};

export const LargeRecipeTitle: Story = {
  args: {
    recipe: {
      ...recipeMock,
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
    },
  },
};
